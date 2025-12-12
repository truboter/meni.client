import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouteHandler } from "./RouteHandler.tsx";
import { LegalPageWrapper } from "./LegalPageWrapper.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { SentryTestPage } from "./components/SentryTest.tsx";
import { initSentry } from "./lib/sentry.ts";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "./index.css";

// Initialize Amplify
Amplify.configure(outputs);

// Initialize Sentry BEFORE rendering React
initSentry();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Legal pages with optional language parameter */}
          <Route
            path="/privacy"
            element={<LegalPageWrapper page="privacy" />}
          />
          <Route
            path="/privacy/:lang"
            element={<LegalPageWrapper page="privacy" />}
          />
          <Route path="/terms" element={<LegalPageWrapper page="terms" />} />
          <Route
            path="/terms/:lang"
            element={<LegalPageWrapper page="terms" />}
          />
          <Route
            path="/cookies"
            element={<LegalPageWrapper page="cookies" />}
          />
          <Route
            path="/cookies/:lang"
            element={<LegalPageWrapper page="cookies" />}
          />
          <Route path="/data" element={<LegalPageWrapper page="data" />} />
          <Route
            path="/data/:lang"
            element={<LegalPageWrapper page="data" />}
          />
          <Route path="/sentry-test" element={<SentryTestPage />} />
          {/* Main app routes */}
          <Route path="/" element={<RouteHandler />} />
          <Route path="/:param1" element={<RouteHandler />} />
          <Route path="/:param1/:param2" element={<RouteHandler />} />
          <Route path="/:param1/:param2/:param3" element={<RouteHandler />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
