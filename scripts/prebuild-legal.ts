#!/usr/bin/env tsx
/**
 * Pre-build script to generate all translated legal documents
 * Run this before deployment to ensure all translations are ready
 *
 * Usage:
 *   npm run prebuild:legal
 */

import { execSync } from "child_process";
import { existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");

const DOCUMENTS = ["privacy", "terms", "cookies"];
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

console.log("\n🌐 Pre-build: Generating translated legal documents");
console.log("====================================================\n");

const startTime = Date.now();
let totalGenerated = 0;
let skipped = 0;
let errors = 0;

for (const document of DOCUMENTS) {
  console.log(`📄 Processing ${document}...`);

  for (const lang of LANGUAGES) {
    const outputPath = resolve(
      projectRoot,
      `public/legal/${document}-${lang}.md`
    );

    // Skip if file already exists (saves time, uses cache anyway)
    if (existsSync(outputPath)) {
      skipped++;
      continue;
    }

    try {
      console.log(`  ├─ Generating ${lang}...`);

      execSync(
        `npm run translate-legal -- --document ${document} --target ${lang}`,
        {
          cwd: projectRoot,
          stdio: "inherit",
        }
      );

      totalGenerated++;
      console.log(`  ✓  ${lang} complete`);
    } catch (error: any) {
      errors++;
      console.error(
        `  ❌ Failed to generate ${document}-${lang}:`,
        error.message
      );
    }
  }

  console.log(`  ✅ ${document} complete\n`);
}

const duration = ((Date.now() - startTime) / 1000).toFixed(1);

console.log("\n====================================================");
console.log(`✅ Pre-build complete in ${duration}s`);
console.log(`📊 Stats:`);
console.log(`   - Generated: ${totalGenerated}`);
console.log(`   - Skipped (already exist): ${skipped}`);
console.log(`   - Errors: ${errors}`);
console.log("====================================================\n");

if (errors > 0) {
  console.error("⚠️  Some translations failed. Check errors above.");
  process.exit(1);
}
