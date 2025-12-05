import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouteHandler } from "./RouteHandler.tsx";
import { LegalPageWrapper } from "./LegalPageWrapper.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { SentryTestPage } from "./components/SentryTest.tsx";
import { initSentry } from "./lib/sentry.ts";
import "./index.css";

// Initialize Sentry BEFORE rendering React
initSentry();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/privacy" element={<LegalPageWrapper page="privacy" />} />
          <Route path="/terms" element={<LegalPageWrapper page="terms" />} />
          <Route path="/data" element={<LegalPageWrapper page="data" />} />
          <Route path="/sentry-test" element={<SentryTestPage />} />
          <Route path="/" element={<RouteHandler />} />
          <Route path="/:param1" element={<RouteHandler />} />
          <Route path="/:param1/:param2" element={<RouteHandler />} />
          <Route path="/:param1/:param2/:param3" element={<RouteHandler />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
