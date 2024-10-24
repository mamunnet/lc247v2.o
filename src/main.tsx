import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DbProvider } from "./contexts/DbContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AgentProvider } from "./contexts/AgentContext";
import { NoticeProvider } from "./contexts/NoticeContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DbProvider>
        <AuthProvider>
          <AgentProvider>
            <NoticeProvider>
              <App />
            </NoticeProvider>
          </AgentProvider>
        </AuthProvider>
      </DbProvider>
    </BrowserRouter>
  </StrictMode>
);