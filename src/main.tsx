import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Analytics />
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
