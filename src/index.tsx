import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Add this import
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ResumeProvider } from "./components/ResumeContext"; // ✅ Important

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
