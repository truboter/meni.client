/**
 * Vite plugin to pre-generate translated legal documents
 * This plugin runs during build to create all language versions
 */

import { exec } from "child_process";
import { promisify } from "util";
import type { Plugin } from "vite";

const execAsync = promisify(exec);

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

export function legalTranslationPlugin(): Plugin {
  let isProduction = false;

  return {
    name: "legal-translation-plugin",

    configResolved(config) {
      isProduction = config.command === "build";
    },

    async buildStart() {
      if (!isProduction) {
        return;
      }

      console.log("\n🌐 Pre-generating translated legal documents...\n");

      const startTime = Date.now();
      let totalGenerated = 0;

      for (const document of DOCUMENTS) {
        console.log(`📄 Translating ${document}...`);

        for (const lang of LANGUAGES) {
          try {
            // Skip if already exists (to save time)
            // The translate-legal script will use cache anyway

            console.log(`  ├─ ${lang}...`);

            const { stdout, stderr } = await execAsync(
              `npm run translate-legal -- --document ${document} --target ${lang}`
            );

            if (stderr && !stderr.includes("npm warn")) {
              console.error(`     ⚠️  ${stderr}`);
            }

            totalGenerated++;
            console.log(`  ✓  ${lang} complete`);
          } catch (error: any) {
            console.error(
              `  ❌ Failed to translate ${document} to ${lang}:`,
              error.message
            );
          }
        }

        console.log(`  ✅ ${document} complete\n`);
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(
        `\n✅ Generated ${totalGenerated} translations in ${duration}s\n`
      );
    },
  };
}
