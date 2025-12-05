import * as Sentry from "@sentry/react";

export function initSentry() {
  // Only initialize Sentry in production or if explicitly enabled
  if (import.meta.env.PROD || import.meta.env.VITE_SENTRY_ENABLED === 'true') {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN || "https://ec6efc983b7e64bd58a48abf1a01b0a6@o4510484388577280.ingest.de.sentry.io/4510484390215760",
      
      // Environment
      environment: import.meta.env.MODE,
      
      // IMPORTANT: Set to false for GDPR compliance
      // We manually control what PII is sent
      sendDefaultPii: false,
      
      // Performance Monitoring
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          // Privacy settings - mask all text and block all media by default
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      
      // Performance monitoring - sample rate (0.0 to 1.0)
      tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
      
      // Session Replay - sample rate
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% when errors occur
      
      // Release tracking
      release: import.meta.env.VITE_APP_VERSION || '1.0.0',
      
      // Privacy: scrub sensitive data
      beforeSend(event, hint) {
        // Remove sensitive data
        if (event.request) {
          delete event.request.cookies;
        }
        
        // Remove PII from user data
        if (event.user) {
          delete event.user.email;
          delete event.user.ip_address;
        }
        
        // Filter out specific errors if needed
        const error = hint.originalException;
        if (error && typeof error === 'object' && 'message' in error) {
          // Skip network errors in development
          if (!import.meta.env.PROD && String(error.message).includes('fetch')) {
            return null;
          }
        }
        
        return event;
      },
      
      // Ignore specific errors
      ignoreErrors: [
        // Browser extensions
        'top.GLOBALS',
        'ResizeObserver loop limit exceeded',
        'ResizeObserver loop completed with undelivered notifications',
        // Network errors that are user-related
        'Network request failed',
        'NetworkError',
        // Firebase
        'auth/network-request-failed',
      ],
      
      // Deny URLs - don't track errors from these sources
      denyUrls: [
        /extensions\//i,
        /^chrome:\/\//i,
        /^chrome-extension:\/\//i,
      ],
    });
    
    console.log('[Sentry] Initialized in', import.meta.env.MODE, 'mode');
    console.log('[Sentry] EU data residency (Germany)');
    console.log('[Sentry] Privacy: PII scrubbing enabled, sendDefaultPii: false');
  } else {
    console.log('[Sentry] Disabled in development mode');
    console.log('[Sentry] To enable in dev: set VITE_SENTRY_ENABLED=true');
  }
}

// Helper to manually capture errors
export function captureError(error: Error, context?: Record<string, any>) {
  if (import.meta.env.PROD || import.meta.env.VITE_SENTRY_ENABLED === 'true') {
    Sentry.captureException(error, { extra: context });
  } else {
    console.error('[Sentry - Dev]', error, context);
  }
}

// Helper to capture messages
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  if (import.meta.env.PROD || import.meta.env.VITE_SENTRY_ENABLED === 'true') {
    Sentry.captureMessage(message, level);
  } else {
    console.log('[Sentry - Dev]', level, message);
  }
}

// Helper to set user context (anonymized)
export function setUserContext(userId: string) {
  Sentry.setUser({ id: userId });
}

// Helper to clear user context (on logout)
export function clearUserContext() {
  Sentry.setUser(null);
}
