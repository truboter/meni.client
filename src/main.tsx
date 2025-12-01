import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouteHandler } from "./RouteHandler.tsx";
import { LegalPageWrapper } from "./LegalPageWrapper.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/privacy" element={<LegalPageWrapper page="privacy" />} />
        <Route path="/terms" element={<LegalPageWrapper page="terms" />} />
        <Route path="/data" element={<LegalPageWrapper page="data" />} />
        <Route path="/" element={<RouteHandler />} />
        <Route path="/:param1" element={<RouteHandler />} />
        <Route path="/:param1/:param2" element={<RouteHandler />} />
        <Route path="/:param1/:param2/:param3" element={<RouteHandler />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
