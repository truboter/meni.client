# Legal Documents Translation System

This directory contains scripts for automated translation of legal documents (privacy policy, terms of service, cookies policy) into 27 languages using OpenAI GPT-5.1.

## Overview

- **Source Documents**: `public/legal/privacy.md`, `public/legal/terms.md`, `public/legal/cookies.md`
- **Output**: `public/legal/{document}-{lang}.md` (e.g., `privacy-ru.md`, `terms-es.md`)
- **Caching**: S3 bucket `cdn.meni` at `legal/translations/{document}/{lang}/{hash}.md`
- **Model**: OpenAI GPT-5.1 (latest, November 2025)

## Supported Languages (27)

`ka` (Georgian), `en` (English), `ru` (Russian), `tr` (Turkish), `hy` (Armenian), `zh` (Chinese), `hi` (Hindi), `es` (Spanish), `fr` (French), `ar` (Arabic), `bn` (Bengali), `pt` (Portuguese), `id` (Indonesian), `ur` (Urdu), `de` (German), `ja` (Japanese), `ko` (Korean), `vi` (Vietnamese), `it` (Italian), `pl` (Polish), `uk` (Ukrainian), `fa` (Persian), `he` (Hebrew), `az` (Azerbaijani), `kk` (Kazakh), `uz` (Uzbek), `ab` (Abkhazian)

## Scripts

### translate-legal.ts

Main translation script with context-aware caching and HTML comment support.

**Usage:**

```bash
# Translate single document to single language
npm run translate-legal -- --document privacy --target ru

# Translate single document to all languages
npm run translate-legal -- --document terms --target all

# Translate all documents to single language
npm run translate-legal -- --document all --target es

# Translate everything (all documents × all languages = 81 files)
npm run translate-legal -- --document all --target all

# Force refresh cache (skip cache read, but still write)
npm run translate-legal -- --document privacy --target ru --no-cache
```

**Parameters:**
- `--document <name>`: `privacy`, `terms`, `cookies`, or `all`
- `--target <lang>`: Two-letter language code or `all`
- `--no-cache`: Skip cache reading (force re-translate), but still save to cache

**Features:**
- HTML comment extraction as translation instructions
- Context-aware caching (hash includes both context and text)
- Artifact removal (cleans GPT meta-text like "Here's the translation:")
- Detailed logging to `.log` files
- Progress indicators with translation previews
- Special case for English (removes comments, no API calls)

### prebuild-legal.ts

Pre-build script to generate all translations before deployment.

**Usage:**

```bash
# Generate all missing translations
npm run prebuild:legal
```

This script:
1. Checks which translations already exist
2. Generates only missing ones (uses cache for speed)
3. Reports stats (generated, skipped, errors)
4. Exits with error if any translation fails

**When to run:**
- Before deployment to production
- After updating source documents
- When adding new languages

## URL Structure

Legal documents are accessible via clean URLs with optional language parameter:

- `/privacy` - Privacy Policy (uses localStorage language or default `ka`)
- `/privacy/ru` - Privacy Policy in Russian
- `/privacy/en` - Privacy Policy in English
- `/terms` - Terms of Service
- `/terms/es` - Terms of Service in Spanish
- `/cookies` - Cookies Policy
- `/cookies/de` - Cookies Policy in German
- `/data` - Data Management (modal-only, no translations)

## HTML Comments for Translation Context

Source documents use HTML comments to provide translation instructions:

```markdown
<!-- The Georgian address should remain in Georgian script. Do not translate place names. -->
**Registered address (Georgia):**  
6010, საქართველო, ქალაქი ბათუმი, გრიგოლ ელიავას ქუჩა, N 32ე, სართული 2, ბინა N201ა

<!-- "GDPR" stands for General Data Protection Regulation - use the official translation/transliteration in your language if one exists. -->
We are committed to protecting your privacy and processing your personal data in accordance with the EU General Data Protection Regulation (GDPR).
```

**Rules:**
- Comments apply to all subsequent paragraphs until next comment
- Empty comment `<!-- -->` clears context
- Comments are removed in English output
- Comments are included in cache key (same text with different context = different cache)

## Caching Strategy

**Cache Key Format:**
```
SHA256(context + "|||" + text).substring(0, 16)
```

**S3 Structure:**
```
cdn.meni/
  legal/
    translations/
      privacy/
        ru/
          a1b2c3d4e5f6g7h8.md  (cached translation)
        es/
          x9y8z7w6v5u4t3s2.md
      terms/
        de/
          ...
      cookies/
        fr/
          ...
```

**Benefits:**
- Same paragraph reused across documents = cached
- Same paragraph with different context = separate cache
- Updates to source document = new cache keys
- Fast subsequent builds (most chunks cached)

## Deployment Workflow

### Development
```bash
npm run dev
# Legal pages accessible at /privacy, /terms, /cookies
```

### Translation
```bash
# Translate specific language
npm run translate-legal -- --document all --target ru

# Or translate everything
npm run translate-legal -- --document all --target all
```

### Pre-build (before deployment)
```bash
npm run prebuild:legal
# Generates all missing translations
# Skips existing files (faster)
```

### Build
```bash
npm run build
# TypeScript compilation + Vite build
# All translated .md files are bundled
```

## File Structure

```
meni_client/
├── public/
│   └── legal/
│       ├── privacy.md          # Master (with HTML comments)
│       ├── privacy-en.md       # English (no comments)
│       ├── privacy-ru.md       # Russian
│       ├── privacy-es.md       # Spanish
│       ├── ...                 # 27 languages × 3 documents = 81 files
│       ├── terms.md
│       ├── terms-en.md
│       ├── ...
│       ├── cookies.md
│       ├── cookies-en.md
│       └── ...
├── scripts/
│   ├── translate-legal.ts      # Main translation script
│   ├── prebuild-legal.ts       # Pre-build automation
│   └── translate-privacy.ts    # Legacy (privacy-only)
├── src/
│   ├── pages/
│   │   ├── PrivacyPolicy.tsx   # Privacy page component
│   │   ├── TermsOfService.tsx  # Terms page component
│   │   └── CookiesPolicy.tsx   # Cookies page component
│   ├── LegalPageWrapper.tsx    # Route wrapper with language detection
│   └── main.tsx                # Route definitions
└── package.json                # Scripts: translate-legal, prebuild:legal
```

## Environment Variables

Required in `.env.local`:

```bash
VITE_OPENAI_API_KEY=sk-proj-...your-key...
```

Also used for AWS S3 (requires credentials in environment):
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION=eu-central-1`

## Logging

Each translation run creates a `.log` file:

```
public/legal/privacy-ru.log
public/legal/terms-es.log
public/legal/cookies-de.log
```

**Log Contents:**
- Model used (GPT-5.1)
- Timestamp
- Total chunks processed
- Cache hits vs new translations
- For each chunk:
  - Context (if any)
  - Original text
  - Translated text
  - Status (Cached/Translated/Original)

## Performance

**Timing Estimates:**
- Single language, single document: ~5-10 minutes (depending on cache)
- Single language, all documents: ~15-30 minutes
- All languages, all documents: ~6-12 hours (first run, no cache)
- All languages, all documents: ~1-2 hours (with full cache)

**Optimization:**
- S3 caching reduces API calls by ~70-90% on subsequent runs
- Context-aware keys ensure accuracy while maximizing cache reuse
- 1000ms delay between API calls (rate limiting)
- Chunk-based processing (480-500 chunks per document)

## Troubleshooting

### Translation fails with OpenAI error
- Check `VITE_OPENAI_API_KEY` in `.env.local`
- Verify API key has credits
- Check OpenAI API status

### S3 cache errors
- Check AWS credentials
- Verify S3 bucket `cdn.meni` exists
- Check bucket permissions (read/write)

### Missing translations
- Run `npm run prebuild:legal`
- Check `.log` files for errors
- Verify source documents exist

### Incorrect translations
- Check HTML comments in source documents
- Use `--no-cache` to force re-translation
- Review GPT-5.1 model output in logs

## Future Improvements

- [ ] Parallel translation (multiple languages at once)
- [ ] Incremental updates (only translate changed chunks)
- [ ] Translation quality validation
- [ ] Automated testing of translated markdown
- [ ] CI/CD integration for automatic translations on commit
- [ ] Translation memory across documents
- [ ] Human review workflow for critical changes

