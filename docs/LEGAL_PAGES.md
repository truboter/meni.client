# Legal Pages - Implementation Guide

## Overview

Legal documents (privacy, terms, cookies) are now accessible via dedicated URLs with language support and SSR/SSG hydration during build.

## URL Structure

```
/privacy          → Privacy Policy (default language or from localStorage)
/privacy/ru       → Privacy Policy in Russian
/privacy/en       → Privacy Policy in English
/terms            → Terms of Service
/terms/es         → Terms in Spanish
/cookies          → Cookies Policy
/cookies/de       → Cookies in German
/data             → Data Management (modal only, no translations)
```

## How It Works

### 1. Source Documents

Master documents with HTML comments for translation context:

```
public/legal/
  privacy.md    ← Master with HTML comments
  terms.md      ← Master with HTML comments
  cookies.md    ← Master with HTML comments
```

### 2. Translation Script

Generate language versions:

```bash
# Single language
npm run translate-legal -- --document privacy --target ru

# All documents, single language
npm run translate-legal -- --document all --target es

# Everything (3 docs × 27 langs = 81 files)
npm run translate-legal -- --document all --target all
```

### 3. Pre-build (before deployment)

```bash
npm run prebuild:legal
```

This generates all missing translations using S3 cache for speed.

### 4. Build

```bash
npm run build
```

Vite bundles all `.md` files. They load dynamically at runtime.

## Components

### Page Components

- `src/pages/PrivacyPolicy.tsx` - Privacy policy page
- `src/pages/TermsOfService.tsx` - Terms of service page
- `src/pages/CookiesPolicy.tsx` - Cookies policy page (NEW)

Each component:

- Loads markdown from `/legal/{document}-{lang}.md`
- Falls back to English if language version missing
- Falls back to source document if English missing
- Includes `LanguageSelector` component

### Wrapper

`src/LegalPageWrapper.tsx`:

- Reads language from URL parameter (priority #1)
- Falls back to localStorage
- Falls back to default (`ka`)
- Passes language to page component

### Routes

`src/main.tsx`:

```tsx
<Route path="/privacy" element={<LegalPageWrapper page="privacy" />} />
<Route path="/privacy/:lang" element={<LegalPageWrapper page="privacy" />} />
<Route path="/terms" element={<LegalPageWrapper page="terms" />} />
<Route path="/terms/:lang" element={<LegalPageWrapper page="terms" />} />
<Route path="/cookies" element={<LegalPageWrapper page="cookies" />} />
<Route path="/cookies/:lang" element={<LegalPageWrapper page="cookies" />} />
```

## Deployment Workflow

### Development

```bash
npm run dev
# Visit http://localhost:7003/privacy
# Visit http://localhost:7003/privacy/ru
```

### Before Deploy

```bash
# Generate missing translations (uses cache, fast)
npm run prebuild:legal

# Verify files exist
ls public/legal/*.md | wc -l
# Should be: 3 sources + 81 translations = 84 files
```

### Deploy

```bash
npm run build
# All .md files bundled
# Pages load dynamically at runtime
```

## Language Fallback Chain

1. `{document}-{lang}.md` (e.g., `privacy-ru.md`)
2. `{document}-en.md` (English fallback)
3. `{document}.md` (source document)

## SEO Considerations

### URL Structure

- Clean URLs: `/privacy/ru` vs `/privacy?lang=ru`
- Each language gets unique URL
- Good for search indexing

### Meta Tags (TODO)

Add to each page component:

```tsx
<Helmet>
  <title>Privacy Policy - meni.ge</title>
  <meta name="description" content="..." />
  <link rel="alternate" hreflang="en" href="/privacy/en" />
  <link rel="alternate" hreflang="ru" href="/privacy/ru" />
  {/* ... all 27 languages */}
</Helmet>
```

### Sitemap (TODO)

Generate `sitemap.xml`:

```xml
<url>
  <loc>https://meni.ge/privacy</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://meni.ge/privacy/en"/>
  <xhtml:link rel="alternate" hreflang="ru" href="https://meni.ge/privacy/ru"/>
  <!-- ... -->
</url>
```

## Testing

### Local Testing

```bash
# Generate Russian privacy
npm run translate-legal -- --document privacy --target ru

# Start dev server
npm run dev

# Open http://localhost:7003/privacy/ru
```

### Verify Translations

```bash
# Check file exists
ls public/legal/privacy-ru.md

# Check content (first 20 lines)
head -20 public/legal/privacy-ru.md

# Check log
cat public/legal/privacy-ru.log
```

## Troubleshooting

### Translation Not Found (404)

1. Check file exists: `ls public/legal/privacy-ru.md`
2. Generate: `npm run translate-legal -- --document privacy --target ru`
3. Rebuild: `npm run build`

### Wrong Language Displayed

1. Check URL: `/privacy/ru` (not `/privacy`)
2. Clear localStorage: delete `meni_preferred_language`
3. Check browser language settings

### Slow Translation

1. Use cache: don't use `--no-cache` flag
2. Check S3 connection
3. Parallel processing (TODO): modify script to translate multiple chunks in parallel

### Missing HTML Comments

1. Check source document has comments: `grep "<!--" public/legal/privacy.md`
2. Comments apply to subsequent paragraphs until next comment
3. Use empty comment `<!-- -->` to clear context

## Performance

### Cache Hit Rate

- First run: 0% (all API calls)
- Second run: 70-90% (most chunks cached)
- After source update: ~50% (changed chunks only)

### Build Time

- Without translations: ~30s
- With prebuild (cached): +5-10 minutes
- With prebuild (no cache): +6-12 hours

### Runtime Performance

- Markdown files load on-demand
- ~50KB per document
- Gzip compression reduces to ~15KB
- Fast CDN delivery

## Future Improvements

- [ ] Server-side rendering (SSR) for better SEO
- [ ] Pre-rendered static HTML for each language
- [ ] Automated sitemap generation
- [ ] Meta tags with alternate links
- [ ] Translation quality validation
- [ ] A/B testing different translations
- [ ] User feedback on translation quality
- [ ] Professional translator review workflow
- [ ] Incremental updates (only translate changed chunks)
- [ ] Parallel translation (multiple chunks at once)

## Related Documentation

- [Legal Translation Guide](./LEGAL_TRANSLATION.md) - Translation script details
- [Scripts README](../scripts/README.md) - All scripts documentation
- [MCP Server](../mcp-server/README.md) - Copilot ChatGPT-5.1 integration
