import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import OrderView from "./OrderView.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:lang" element={<App />} />
        <Route path="/:locationId/:lang" element={<App />} />
        <Route path="/:locationId/:lang/:orderId" element={<OrderView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
