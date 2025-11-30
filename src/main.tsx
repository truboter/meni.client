import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouteHandler } from "./RouteHandler.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteHandler />} />
        <Route path="/:param1" element={<RouteHandler />} />
        <Route path="/:param1/:param2" element={<RouteHandler />} />
        <Route path="/:param1/:param2/:param3" element={<RouteHandler />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
