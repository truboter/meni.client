#!/usr/bin/env tsx
/**
 * Translation script for legal documents (privacy, terms, cookies)
 * Uses OpenAI GPT-5.1 with S3 caching for efficient translation
 *
 * Usage:
 *   npm run translate-legal -- --document privacy --target ru
 *   npm run translate-legal -- --document terms --target es
 *   npm run translate-legal -- --document cookies --target de
 *   npm run translate-legal -- --document all --target fr
 *   npm run translate-legal -- --document all --target all
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { createHash } from "crypto";
import OpenAI from "openai";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { fileURLToPath } from "url";
import { loadEnv } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
const projectRoot = resolve(__dirname, "..");
const env = loadEnv("", projectRoot, "");

// Initialize OpenAI with API key from environment
const openai = new OpenAI({
  apiKey: env.VITE_OPENAI_API_KEY,
});

// S3 configuration for caching
const s3Client = new S3Client({ region: "eu-central-1" });
const CACHE_BUCKET = "cdn.meni";
const CACHE_PREFIX = "legal/translations";

// Supported languages
const LANGUAGES = [
  "ka",
  "en",
  "ru",
  "tr",
  "hy",
  "zh",
  "hi",
  "es",
  "fr",
  "ar",
  "bn",
  "pt",
  "id",
  "ur",
  "de",
  "ja",
  "ko",
  "vi",
  "it",
  "pl",
  "uk",
  "fa",
  "he",
  "az",
  "kk",
  "uz",
  "ab",
];

// Supported documents
const DOCUMENTS = ["privacy", "terms", "cookies"];

const MODEL = "gpt-5.1";

interface Chunk {
  text: string;
  context: string;
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options: {
    document: string;
    target: string;
    noCache: boolean;
  } = {
    document: "all",
    target: "all",
    noCache: false,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--document" && args[i + 1]) {
      options.document = args[i + 1];
      i++;
    } else if (args[i] === "--target" && args[i + 1]) {
      options.target = args[i + 1];
      i++;
    } else if (args[i] === "--no-cache") {
      options.noCache = true;
    }
  }

  return options;
}

// Extract HTML comment from a line
function extractComment(line: string): string {
  const match = line.match(/<!--\s*(.*?)\s*-->/);
  return match ? match[1].trim() : "";
}

// Remove HTML comments from text
function removeComments(text: string): string {
  return text.replace(/<!--[\s\S]*?-->/g, "").trim();
}

// Split document into chunks with context
function splitIntoChunks(content: string): Chunk[] {
  const lines = content.split("\n");
  const chunks: Chunk[] = [];
  let currentContext = "";

  for (const line of lines) {
    const trimmed = line.trim();

    // Check if this line is a comment
    const comment = extractComment(trimmed);
    if (comment) {
      currentContext = comment;
      continue;
    }

    // Skip empty comment markers
    if (trimmed === "<!--" || trimmed === "-->") {
      continue;
    }

    // Skip empty lines
    if (!trimmed) {
      continue;
    }

    // Add non-empty, non-comment lines as chunks
    chunks.push({
      text: line,
      context: currentContext,
    });
  }

  return chunks;
}

// Generate cache key from text, language, and context
function getCacheKey(
  text: string,
  targetLang: string,
  context: string
): string {
  const combined = `${context}|||${text}`;
  const hash = createHash("sha256").update(combined).digest("hex");
  return hash.substring(0, 16);
}

// Get translation from S3 cache
async function getFromCache(
  document: string,
  cacheKey: string,
  targetLang: string
): Promise<string | null> {
  try {
    const key = `${CACHE_PREFIX}/${document}/${targetLang}/${cacheKey}.md`;
    const command = new GetObjectCommand({
      Bucket: CACHE_BUCKET,
      Key: key,
    });

    const response = await s3Client.send(command);
    if (response.Body) {
      const cached = await response.Body.transformToString();
      return cached;
    }
  } catch (error: any) {
    if (error.name !== "NoSuchKey") {
      console.error(`Cache read error: ${error.message}`);
    }
  }
  return null;
}

// Save translation to S3 cache
async function saveToCache(
  document: string,
  cacheKey: string,
  targetLang: string,
  translation: string
): Promise<void> {
  try {
    const key = `${CACHE_PREFIX}/${document}/${targetLang}/${cacheKey}.md`;
    const command = new PutObjectCommand({
      Bucket: CACHE_BUCKET,
      Key: key,
      Body: translation,
      ContentType: "text/markdown",
    });

    await s3Client.send(command);
  } catch (error: any) {
    console.error(`❌ Cache write error for key ${cacheKey}: ${error.message}`);
    if (error.Code) {
      console.error(`   Error code: ${error.Code}`);
    }
    console.error(`   Bucket: ${CACHE_BUCKET}`);
    console.error(
      `   Key: ${CACHE_PREFIX}/${document}/${targetLang}/${cacheKey}.md`
    );
  }
}

// Clean translation artifacts
function cleanTranslation(text: string, targetLang: string): string {
  // Language-specific artifact patterns
  const patterns = [
    /^Ваш перевод на русский язык:\s*/i,
    /^\*\*Ваш перевод на русский язык:\*\*\s*/i,
    /^Here is the translation:\s*/i,
    /^Translation:\s*/i,
    /^Перевод:\s*/i,
    /^Вот перевод:\s*/i,
    /^Here you go:\s*/i,
    /^Voici la traduction:\s*/i,
  ];

  let cleaned = text;
  for (const pattern of patterns) {
    cleaned = cleaned.replace(pattern, "");
  }

  return cleaned.trim();
}

// Build translation prompt with context
function buildTranslationPrompt(
  text: string,
  targetLang: string,
  context: string
): string {
  const basePrompt = `Translate the following text to ${targetLang}. Preserve all markdown formatting, links, and structure exactly. Output ONLY the translation without any meta-text, explanations, or headers.`;

  if (context) {
    return `${basePrompt}\n\nIMPORTANT TRANSLATION RULE: ${context}\n\nText to translate:\n${text}`;
  }

  return `${basePrompt}\n\nText to translate:\n${text}`;
}

// Translate chunk with GPT
async function translateWithGPT(
  text: string,
  targetLang: string,
  context: string
): Promise<string> {
  const userPrompt = buildTranslationPrompt(text, targetLang, context);

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are a professional translator. Translate accurately while preserving markdown formatting. Output ONLY the translation.",
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 2000,
  });

  const translation = response.choices[0]?.message?.content || text;
  return cleanTranslation(translation, targetLang);
}

// Translate a document
async function translateDocument(
  document: string,
  targetLang: string,
  noCache: boolean
): Promise<void> {
  const sourcePath = resolve(projectRoot, `public/legal/${document}.md`);
  const outputPath = resolve(
    projectRoot,
    `public/legal/${document}-${targetLang}.md`
  );

  console.log(`\n🌍 Translating ${document}.md to ${targetLang}`);
  console.log(`Source: ${sourcePath}`);
  console.log(`Output: ${outputPath}`);
  console.log(`Model: ${MODEL}`);
  console.log(`Cache: ${noCache ? "Disabled (force refresh)" : "Enabled"}\n`);

  // Read source document
  const sourceContent = readFileSync(sourcePath, "utf-8");
  const chunks = splitIntoChunks(sourceContent);

  console.log(`📄 Split document into ${chunks.length} chunks\n`);

  const translatedChunks: string[] = [];
  let cacheHits = 0;
  let translations = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const progress = ((i / chunks.length) * 100).toFixed(1);
    const preview = chunk.text.substring(0, 50).replace(/\n/g, " ");

    console.log(`[${i + 1}/${chunks.length}] (${progress}%) ${preview}...`);

    if (chunk.context) {
      const contextPreview = chunk.context.substring(0, 80);
      console.log(`  📝 Context: ${contextPreview}...`);
    }

    let translated: string;
    let status: string;

    // Special case: English - just remove comments
    if (targetLang === "en") {
      translated = removeComments(chunk.text);
      status = "Original";
    } else {
      const cacheKey = getCacheKey(chunk.text, targetLang, chunk.context);

      // Try cache first (unless --no-cache)
      if (!noCache) {
        const cached = await getFromCache(document, cacheKey, targetLang);
        if (cached) {
          translated = cached;
          status = "Cached";
          cacheHits++;
          console.log(`  ✓ From cache`);
        } else {
          translated = await translateWithGPT(
            chunk.text,
            targetLang,
            chunk.context
          );
          status = "Translated";
          translations++;
          await saveToCache(document, cacheKey, targetLang, translated);
          console.log(`  ⏳ Translated and cached`);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } else {
        translated = await translateWithGPT(
          chunk.text,
          targetLang,
          chunk.context
        );
        status = "Translated (no-cache)";
        translations++;
        await saveToCache(document, cacheKey, targetLang, translated);
        console.log(`  ⏳ Translated and cached (force refresh)`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    const translationPreview = translated.substring(0, 100).replace(/\n/g, " ");
    console.log(`  📄 Translation: ${translationPreview}...`);

    translatedChunks.push(translated);
    console.log(`  ✓ Done\n`);
  }

  // Join all translated chunks
  const finalContent = translatedChunks.join("\n");

  // Write output file
  writeFileSync(outputPath, finalContent, "utf-8");

  console.log(`\n✅ Translation complete!`);
  console.log(`📝 Output: ${outputPath}`);
  console.log(`📊 Stats: ${cacheHits} cached, ${translations} translated\n`);
}

// Main function
async function main() {
  const options = parseArgs();

  // Validate document
  const documentsToTranslate =
    options.document === "all" ? DOCUMENTS : [options.document];

  for (const doc of documentsToTranslate) {
    if (!DOCUMENTS.includes(doc)) {
      console.error(
        `❌ Invalid document: ${doc}. Must be one of: ${DOCUMENTS.join(", ")}, all`
      );
      process.exit(1);
    }
  }

  // Validate target language
  const languagesToTranslate =
    options.target === "all" ? LANGUAGES : [options.target];

  for (const lang of languagesToTranslate) {
    if (!LANGUAGES.includes(lang)) {
      console.error(
        `❌ Invalid language: ${lang}. Must be one of: ${LANGUAGES.join(", ")}, all`
      );
      process.exit(1);
    }
  }

  console.log("\n🌐 Legal Document Translation Tool");
  console.log("=====================================");
  console.log(`Documents: ${documentsToTranslate.join(", ")}`);
  console.log(`Languages: ${languagesToTranslate.join(", ")}`);
  console.log(`Cache: ${options.noCache ? "Disabled" : "Enabled"}`);

  // Translate all combinations
  for (const doc of documentsToTranslate) {
    for (const lang of languagesToTranslate) {
      await translateDocument(doc, lang, options.noCache);
    }
  }

  console.log("\n✅ All translations complete!\n");
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
