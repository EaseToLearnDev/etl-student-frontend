import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { MathJaxContext } from "better-react-mathjax";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <MathJaxContext>
        <App />
      </MathJaxContext>
    </BrowserRouter>
  </StrictMode>
);
