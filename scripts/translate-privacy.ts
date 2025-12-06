/**
 * Privacy Policy Translation Utility
 *
 * This script translates privacy policy documents using OpenAI's GPT API
 * with paragraph-level caching in S3 (cdn.meni.ge/legal/)
 *
 * Usage:
 *   npm run translate-privacy -- --source privacy-en.md --target ru --output privacy-ru.md
 */

import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import OpenAI from "openai";
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

// Load .env.local file
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...valueParts] = trimmed.split("=");
        const value = valueParts.join("=").trim();
        if (key && value) {
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnv();

// Configuration
const CACHE_BUCKET = "cdn.meni";
const CACHE_PREFIX = "legal/translations";
const GPT_MODEL = "gpt-5.1"; // Latest and most capable model (Nov 2025)
const CHUNK_DELAY_MS = 1000; // Delay between API calls to avoid rate limits

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
});

// Initialize S3 client
const s3Client = new S3Client({
  region: "eu-central-1",
});

interface TranslationOptions {
  sourcePath: string;
  targetLanguage: string;
  outputPath: string;
  skipCache?: boolean;
}

/**
 * Generate cache key for a paragraph with context
 */
function getCacheKey(
  text: string,
  targetLang: string,
  context: string = ""
): string {
  // Combine text and context for cache key to ensure same text with different contexts gets different translations
  const cacheInput = context ? `${context}|||${text}` : text;
  const hash = crypto
    .createHash("sha256")
    .update(cacheInput)
    .digest("hex")
    .substring(0, 16);
  return `${CACHE_PREFIX}/${targetLang}/${hash}.md`;
}

/**
 * Get translation from S3 cache
 */
async function getFromCache(cacheKey: string): Promise<string | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: CACHE_BUCKET,
      Key: cacheKey,
    });
    const response = await s3Client.send(command);
    const body = await response.Body?.transformToString();
    return body || null;
  } catch (error: any) {
    if (error.name === "NoSuchKey") {
      return null;
    }
    console.error(`Cache read error for ${cacheKey}:`, error.message);
    return null;
  }
}

/**
 * Save translation to S3 cache
 */
async function saveToCache(
  cacheKey: string,
  translation: string
): Promise<void> {
  try {
    const command = new PutObjectCommand({
      Bucket: CACHE_BUCKET,
      Key: cacheKey,
      Body: translation,
      ContentType: "text/markdown",
      CacheControl: "public, max-age=31536000", // 1 year
    });
    await s3Client.send(command);
    console.log(`  ✓ Cached: s3://${CACHE_BUCKET}/${cacheKey}`);
  } catch (error: any) {
    console.error(`  ✗ Cache save error for ${cacheKey}:`);
    console.error(`     Bucket: ${CACHE_BUCKET}`);
    console.error(`     Error: ${error.message}`);
    if (error.Code) console.error(`     Code: ${error.Code}`);
  }
}

/**
 * Get language name for prompts
 */
function getLanguageName(code: string): string {
  const languages: Record<string, string> = {
    ru: "Russian",
    ka: "Georgian",
    de: "German",
    fr: "French",
    it: "Italian",
    tr: "Turkish",
    he: "Hebrew",
    es: "Spanish",
    ar: "Arabic",
    zh: "Chinese",
    hi: "Hindi",
    bn: "Bengali",
    pt: "Portuguese",
    id: "Indonesian",
    ur: "Urdu",
    ja: "Japanese",
    ko: "Korean",
    vi: "Vietnamese",
    pl: "Polish",
    uk: "Ukrainian",
    fa: "Persian",
    hy: "Armenian",
    az: "Azerbaijani",
    kk: "Kazakh",
    uz: "Uzbek",
    ab: "Abkhazian",
  };
  return languages[code] || code;
}

/**
 * Build translation prompt with context from HTML comments
 */
function buildTranslationPrompt(
  text: string,
  targetLang: string,
  context: string = ""
): string {
  const langName = getLanguageName(targetLang);

  let prompt = `You are a professional legal translator specializing in privacy policies and GDPR compliance documents.

Translate the following text from English to ${langName}. This is part of a Privacy Policy for meni.ge restaurant ordering application.

CRITICAL RULES:
1. Output ONLY the translation - no explanations, no meta-text, no headers like "Your translation:" or "Here is the translation:"
2. Preserve ALL markdown formatting exactly (# headers, **bold**, - lists, line breaks)
3. Use proper legal terminology for ${langName}
4. Maintain consistency in GDPR terms (data controller, processing, legitimate interests, etc.)
5. Keep company names, addresses, emails, technical terms (localStorage, GPS, IP) unchanged
6. Ensure clarity while maintaining legal precision`;

  if (context) {
    prompt += `\n7. SPECIAL INSTRUCTION: ${context}`;
  }

  prompt += `\n\nSource text to translate:\n\n${text}`;

  return prompt;
}

/**
 * Clean translation output from GPT artifacts
 */
function cleanTranslation(text: string): string {
  let cleaned = text.trim();

  // Remove common GPT artifacts
  const artifactPatterns = [
    /^.*?перевод на русский язык:?\s*\n*/i,
    /^.*?russian translation:?\s*\n*/i,
    /^.*?ваш перевод:?\s*\n*/i,
    /^.*?your translation:?\s*\n*/i,
    /^.*?вот перевод:?\s*\n*/i,
    /^.*?here is the translation:?\s*\n*/i,
    /^```[\s\S]*?\n/, // Remove opening code blocks
    /\n```\s*$/, // Remove closing code blocks
  ];

  artifactPatterns.forEach((pattern) => {
    cleaned = cleaned.replace(pattern, "");
  });

  return cleaned.trim();
}

/**
 * Translate text using OpenAI API
 */
async function translateWithGPT(
  text: string,
  targetLang: string,
  context: string = ""
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a professional legal translator. Output ONLY the translation without any meta-text, explanations, or markers. Preserve all markdown formatting exactly.",
        },
        {
          role: "user",
          content: buildTranslationPrompt(text, targetLang, context),
        },
      ],
      temperature: 0.3, // Lower temperature for more consistent, accurate translations
      max_completion_tokens: 4000,
    });

    const translation = response.choices[0]?.message?.content?.trim();
    if (!translation) {
      throw new Error("Empty response from OpenAI");
    }

    // Clean up any artifacts
    return cleanTranslation(translation);
  } catch (error: any) {
    console.error(`Translation error:`, error.message);
    throw error;
  }
}

/**
 * Extract HTML comment from text
 */
function extractComment(text: string): string | null {
  const commentMatch = text.match(/<!--\s*(.+?)\s*-->/s);
  return commentMatch ? commentMatch[1].trim() : null;
}

/**
 * Remove HTML comments from text
 */
function removeComments(text: string): string {
  return text.replace(/<!--[\s\S]*?-->/g, "").trim();
}

interface Chunk {
  text: string;
  context: string; // Last encountered HTML comment
}

/**
 * Split markdown document into logical chunks (paragraphs/sections) with context
 */
function splitIntoChunks(content: string): Chunk[] {
  // Split by double newlines (paragraphs) but keep the structure
  const chunks: Chunk[] = [];
  const lines = content.split("\n");
  let currentChunk: string[] = [];
  let lastContext = ""; // Track the last HTML comment seen

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this line contains an HTML comment
    const comment = extractComment(line);
    if (comment) {
      // Update context for subsequent chunks
      lastContext = comment;
      // Don't include comment lines in chunks (they're instructions, not content)
      continue;
    }

    // Add line to current chunk
    currentChunk.push(line);

    // Check if we should flush the chunk
    const isEmptyLine = line.trim() === "";
    const nextLine = lines[i + 1];
    const isLastLine = i === lines.length - 1;

    // Flush chunk when:
    // 1. We hit an empty line and the next line is not empty (end of paragraph)
    // 2. We hit a header (lines starting with #)
    // 3. We're at the last line
    if (isLastLine || (isEmptyLine && nextLine && nextLine.trim() !== "")) {
      const chunkText = currentChunk.join("\n").trim();
      if (chunkText) {
        // Remove HTML comments from the actual content (they're only used as instructions)
        const cleanText = removeComments(chunkText);
        if (cleanText) {
          chunks.push({
            text: cleanText,
            context: lastContext,
          });
        }
      }
      currentChunk = [];
    }
  }

  return chunks.filter((c) => c.text.length > 0);
}

/**
 * Main translation function
 */
async function translatePrivacyPolicy(
  options: TranslationOptions
): Promise<void> {
  const { sourcePath, targetLanguage, outputPath, skipCache = false } = options;

  console.log("\n🌍 Privacy Policy Translation Tool");
  console.log("=====================================");
  console.log(`Source: ${sourcePath}`);
  console.log(
    `Target Language: ${getLanguageName(targetLanguage)} (${targetLanguage})`
  );
  console.log(`Output: ${outputPath}`);
  console.log(`Model: ${GPT_MODEL}`);
  console.log(`Cache: ${skipCache ? "Disabled" : "Enabled"}\n`);

  // Read source file
  const sourceContent = fs.readFileSync(sourcePath, "utf-8");

  // Split into chunks
  const chunks = splitIntoChunks(sourceContent);
  console.log(`📄 Split document into ${chunks.length} chunks\n`);

  // Translate each chunk
  const translatedChunks: string[] = [];
  const chunkDetails: Array<{
    index: number;
    status: string;
    original: string;
    translated: string;
    context: string;
  }> = [];
  let cacheHits = 0;
  let cacheMisses = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const chunkNum = i + 1;
    const progress = ((i / chunks.length) * 100).toFixed(1);
    const preview =
      chunk.text.substring(0, 60).replace(/\n/g, " ") +
      (chunk.text.length > 60 ? "..." : "");

    console.log(`[${chunkNum}/${chunks.length}] (${progress}%) ${preview}`);
    if (chunk.context) {
      console.log(
        `  📝 Context: ${chunk.context.substring(0, 80)}${chunk.context.length > 80 ? "..." : ""}`
      );
    }

    let translation: string;
    let status: string;

    // Special case: English translation = just return original text (removes HTML comments)
    if (targetLanguage === "en") {
      translation = chunk.text;
      status = "Original";
      console.log(`  ✓ Original text (English)\n`);
      translatedChunks.push(translation);
      chunkDetails.push({
        index: chunkNum,
        status,
        original: chunk.text,
        translated: translation,
        context: chunk.context,
      });
      continue;
    }

    // Check cache first
    const cacheKey = getCacheKey(chunk.text, targetLanguage, chunk.context);

    if (!skipCache) {
      const cached = await getFromCache(cacheKey);
      if (cached) {
        translation = cached;
        status = "Cached";
        cacheHits++;
        console.log(`  ✓ From cache`);
      } else {
        // Translate with GPT
        console.log(`  ⏳ Translating...`);
        translation = await translateWithGPT(
          chunk.text,
          targetLanguage,
          chunk.context
        );
        status = "Translated";
        cacheMisses++;

        // Save to cache
        await saveToCache(cacheKey, translation);

        // Rate limiting delay
        if (i < chunks.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, CHUNK_DELAY_MS));
        }
      }
    } else {
      // Skip cache READ, but always WRITE - force re-translation
      console.log(`  ⏳ Translating (cache disabled)...`);
      translation = await translateWithGPT(
        chunk.text,
        targetLanguage,
        chunk.context
      );
      status = "Translated";
      cacheMisses++;

      // Save to cache even when --no-cache is used
      await saveToCache(cacheKey, translation);

      if (i < chunks.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, CHUNK_DELAY_MS));
      }
    }

    translatedChunks.push(translation);
    chunkDetails.push({
      index: chunkNum,
      status,
      original: chunk.text,
      translated: translation,
      context: chunk.context,
    });

    // Show translation preview (first 100 chars)
    const translationPreview =
      translation.substring(0, 100).replace(/\n/g, " ") +
      (translation.length > 100 ? "..." : "");
    console.log(`  📄 Translation: ${translationPreview}`);
    console.log(`  ✓ Done\n`);
  }

  // Combine translated chunks
  const finalTranslation = translatedChunks.join("\n\n");

  // Write output file
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, finalTranslation, "utf-8");

  // Summary
  console.log("=====================================");
  console.log("✅ Translation Complete!");
  console.log(`📊 Statistics:`);
  console.log(`   - Total chunks: ${chunks.length}`);
  console.log(`   - Cache hits: ${cacheHits}`);
  console.log(`   - Cache misses: ${cacheMisses}`);
  console.log(`   - API calls made: ${cacheMisses}`);
  console.log(`   - Output file: ${outputPath}`);
  console.log(
    `   - File size: ${(finalTranslation.length / 1024).toFixed(2)} KB\n`
  );
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const sourcePath = "public/legal/privacy.md"; // Source file with translation instructions
  let targetLanguage = "";
  let skipCache = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--target" && args[i + 1]) {
      targetLanguage = args[i + 1];
      i++;
    } else if (args[i] === "--no-cache") {
      skipCache = true;
    }
  }

  // Auto-generate output path
  let outputPath = "";
  if (targetLanguage) {
    outputPath = `public/legal/privacy-${targetLanguage}.md`;
  }

  // Validate arguments
  if (!targetLanguage) {
    console.error(`
Usage: npm run translate-privacy -- --target <lang> [--no-cache]

Arguments:
  --target <lang>    Target language code (e.g., ru, ka, de, fr)
  --no-cache         Skip cache and force re-translation

Examples:
  npm run translate-privacy -- --target ru
  npm run translate-privacy -- --target ka
  npm run translate-privacy -- --target de --no-cache

Source: public/legal/privacy.md (fixed, includes HTML comment instructions)
Output: public/legal/privacy-{lang}.md (auto-generated)

Supported Languages:
  ru (Russian), ka (Georgian), de (German), fr (French), it (Italian),
  tr (Turkish), he (Hebrew), es (Spanish), ar (Arabic), zh (Chinese),
  hi (Hindi), bn (Bengali), pt (Portuguese), id (Indonesian), ur (Urdu),
  ja (Japanese), ko (Korean), vi (Vietnamese), pl (Polish), uk (Ukrainian),
  fa (Persian), hy (Armenian), az (Azerbaijani), kk (Kazakh), uz (Uzbek),
  ab (Abkhazian)
    `);
    process.exit(1);
  }

  // Check if source file exists
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source file not found: ${sourcePath}`);
    process.exit(1);
  }

  // Check API key
  if (!process.env.VITE_OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
    console.error(
      `❌ OpenAI API key not found. Please set VITE_OPENAI_API_KEY or OPENAI_API_KEY in .env.local`
    );
    process.exit(1);
  }

  try {
    await translatePrivacyPolicy({
      sourcePath,
      targetLanguage,
      outputPath,
      skipCache,
    });
  } catch (error: any) {
    console.error(`\n❌ Translation failed:`, error.message);
    process.exit(1);
  }
}

// Run if called directly
main();

export { translatePrivacyPolicy, TranslationOptions };
