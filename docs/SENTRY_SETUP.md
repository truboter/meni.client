# Sentry Crash Reporting - Installation Guide

## 📋 Overview

We've integrated **Sentry** for crash reporting and error monitoring in the meni.ge application.

**Why Sentry:**
- ✅ Best-in-class React/TypeScript support
- ✅ GDPR compliant (EU data residency available)
- ✅ FREE tier: 5,000 errors/month
- ✅ Performance monitoring & session replay
- ✅ Source maps support
- ✅ Privacy-first configuration

---

## 🚀 Installation Steps

### 1. Install Sentry packages

Run this command in PowerShell/Windows Terminal (not WSL):

```bash
cd C:\GitHub\meni_client
npm install --save @sentry/react @sentry/vite-plugin
```

### 2. Create Sentry account and project

1. Go to https://sentry.io/signup/
2. Create a new organization
3. Create a new project (type: React)
4. Copy your **DSN** (looks like: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)

### 3. Configure environment variables

Copy `.env.sentry.example` to `.env.local` and update:

```bash
VITE_SENTRY_DSN=https://your-actual-dsn-here
VITE_APP_VERSION=1.0.0

# Optional: for source maps upload
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=meni-client
SENTRY_AUTH_TOKEN=your-auth-token
```

### 4. Update vite.config.ts

Add Sentry plugin to your Vite config:

```typescript
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    
    // Sentry plugin for source maps upload
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      
      // Only upload in production builds
      disable: process.env.NODE_ENV !== 'production',
      
      sourcemaps: {
        assets: ['./dist/assets/**'],
      },
    }),
  ],
  
  build: {
    sourcemap: true, // Enable source maps for debugging
  },
});
```

### 5. Initialize Sentry in your app

Update `src/main.tsx`:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { initSentry } from './lib/sentry';

// Initialize Sentry BEFORE React
initSentry();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
```

### 6. Use Sentry helpers in your code

```typescript
import { captureError, captureMessage, setUserContext } from './lib/sentry';

// Capture errors
try {
  // ... code
} catch (error) {
  captureError(error as Error, { context: 'OrderSubmission' });
}

// Capture messages
captureMessage('User completed checkout', 'info');

// Set user context (after login)
setUserContext(userId);

// Clear user context (on logout)
clearUserContext();
```

---

## 🔒 Privacy & GDPR Compliance

### Data Scrubbing (Automatic)

Our Sentry configuration automatically:
- ✅ Masks all text in session replays
- ✅ Blocks all media in session replays
- ✅ Removes cookies from error reports
- ✅ Removes email addresses
- ✅ Removes IP addresses
- ✅ Only sends anonymized user IDs

### EU Data Residency

To store data in EU (GDPR requirement):

1. In Sentry dashboard: Settings → General
2. Set Data Residency to **European Union**
3. This ensures all data stays in EU servers

### User Consent

Add consent check before initializing Sentry:

```typescript
// Only init if user consented to analytics
if (hasUserConsentedToAnalytics()) {
  initSentry();
}
```

---

## 📊 Sentry Features Enabled

### 1. Error Tracking
- Automatic capture of unhandled errors
- Manual error reporting via `captureError()`
- Stack traces with source maps

### 2. Performance Monitoring
- Core Web Vitals tracking
- Page load performance
- API call monitoring
- 10% sample rate in production

### 3. Session Replay
- Video-like reproduction of user sessions (when errors occur)
- 10% of normal sessions
- 100% of error sessions
- Privacy: all text masked, media blocked

### 4. Release Tracking
- Track which version has errors
- Compare error rates between releases
- Automatic version from `VITE_APP_VERSION`

---

## 💰 Pricing

### FREE Tier (Perfect for Start)
- 5,000 errors per month (~160/day)
- 1 user
- 30-day data retention
- Performance monitoring
- Session replay

### Upgrade When Needed
- **Team**: $26/month (50K errors, session replay, 5 users)
- **Business**: $80/month (100K errors, advanced features)

---

## 🔧 Testing

### Test error reporting (Development):

```bash
# Enable Sentry in development
VITE_SENTRY_ENABLED=true npm run dev
```

Then throw a test error in your app:

```typescript
// Add a test button
<button onClick={() => {
  throw new Error('Test Sentry Error!');
}}>
  Test Sentry
</button>
```

Check https://sentry.io to see the error appear!

---

## 📚 Additional Resources

- [Sentry React Docs](https://docs.sentry.io/platforms/javascript/guides/react/)
- [GDPR Guide](https://sentry.io/security/gdpr/)
- [Source Maps Guide](https://docs.sentry.io/platforms/javascript/sourcemaps/)
- [Privacy Settings](https://docs.sentry.io/platforms/javascript/enriching-events/user-feedback/)

---

## ✅ Checklist

- [ ] Install packages: `@sentry/react` and `@sentry/vite-plugin`
- [ ] Create Sentry account and get DSN
- [ ] Add DSN to `.env.local`
- [ ] Update `vite.config.ts` with Sentry plugin
- [ ] Initialize Sentry in `main.tsx`
- [ ] Wrap app with `ErrorBoundary`
- [ ] Set EU data residency in Sentry dashboard
- [ ] Test error reporting
- [ ] Deploy and monitor!

---

**Note:** The configuration files are already created in:
- `src/lib/sentry.ts` - Sentry initialization with privacy settings
- `src/components/ErrorBoundary.tsx` - React error boundary component
- `.env.sentry.example` - Environment variables example

**Next:** Update Privacy Policy with Sentry information ✓ (Done automatically)
