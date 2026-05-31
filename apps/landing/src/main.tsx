import React from "react";
import ReactDOM from "react-dom/client";
import { LandingPage } from "./pages/LandingPage";
import "./styles/landing.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
);
