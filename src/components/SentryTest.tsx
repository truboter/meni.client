import * as Sentry from '@sentry/react';

/**
 * Test component for Sentry error tracking
 * This button intentionally throws an error to verify Sentry integration
 */
export function SentryTestButton() {
  return (
    <div className="p-4 border-2 border-dashed border-orange-400 rounded-lg bg-orange-50">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-orange-900 mb-1">
            Sentry Test Mode
          </h3>
          <p className="text-sm text-orange-700 mb-3">
            Click the button below to throw a test error and verify Sentry integration. 
            Check <a href="https://sentry.io" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-900">sentry.io</a> to see the error.
          </p>
          <button
            onClick={() => {
              console.log('🧪 [Sentry Test] Throwing test error...');
              throw new Error('This is your first error!');
            }}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm"
          >
            Break the world 🔥
          </button>
          <p className="text-xs text-orange-600 mt-2">
            ⚠️ This will trigger an error. Remove this component in production!
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Test component for manual error capture
 */
export function SentryManualTest() {
  const testManualCapture = () => {
    try {
      console.log('🧪 [Sentry Test] Manual error capture...');
      throw new Error('Manual test error');
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          test: 'manual-capture',
          component: 'SentryManualTest',
        },
        extra: {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        },
      });
      console.log('✅ [Sentry Test] Error captured manually');
      alert('Error captured! Check Sentry dashboard.');
    }
  };

  const testMessage = () => {
    console.log('🧪 [Sentry Test] Sending test message...');
    Sentry.captureMessage('Test message from meni.ge', {
      level: 'info',
      tags: {
        test: 'message',
        component: 'SentryManualTest',
      },
    });
    console.log('✅ [Sentry Test] Message sent');
    alert('Message sent! Check Sentry dashboard.');
  };

  return (
    <div className="p-4 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 mt-4">
      <h3 className="text-sm font-semibold text-blue-900 mb-2">
        Manual Capture Tests
      </h3>
      <div className="flex gap-2">
        <button
          onClick={testManualCapture}
          className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Test Exception Capture
        </button>
        <button
          onClick={testMessage}
          className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Test Message
        </button>
      </div>
    </div>
  );
}

/**
 * Complete Sentry test page with all test scenarios
 */
export function SentryTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Sentry Integration Test
            </h1>
            <p className="text-gray-600">
              Test error tracking and monitoring functionality
            </p>
          </div>

          {/* Status */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-green-900">
                Sentry is configured and ready
              </span>
            </div>
            <div className="mt-2 text-xs text-green-700">
              DSN: ingest.de.sentry.io (EU)
              <br />
              Mode: {import.meta.env.PROD ? 'Production' : 'Development'}
              <br />
              Privacy: sendDefaultPii = false ✅
            </div>
          </div>

          {/* Test button */}
          <SentryTestButton />

          {/* Manual tests */}
          <SentryManualTest />

          {/* Instructions */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              What to check:
            </h3>
            <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
              <li>Click "Break the world" button</li>
              <li>Go to <a href="https://sentry.io" target="_blank" className="text-blue-600 underline">sentry.io</a></li>
              <li>Check "Issues" section for new error</li>
              <li>Verify error details and stack trace</li>
              <li>Check that PII is NOT present (no email, IP)</li>
            </ol>
          </div>

          {/* Warning */}
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-700">
              ⚠️ <strong>Remove this test page before production deployment!</strong>
              <br />
              This is only for testing Sentry integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
