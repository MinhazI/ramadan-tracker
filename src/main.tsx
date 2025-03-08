import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Quiz from "./pages/Quiz.tsx";
import Duas from "./pages/Duas.tsx";
import NotFound from "./pages/NotFound.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/daus" element={<Duas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
        <Toaster />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);
