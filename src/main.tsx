import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import App from "./App.tsx";
import "./index.css";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:lang" element={<App />} />
        <Route path="/:locationId/:lang" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
