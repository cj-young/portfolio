import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import CanvasPortalsContextProvider from "./contexts/CanvasPortalsContext.tsx";
import ThreeContextProvider from "./contexts/ThreeContext.tsx";
import "./index.css";
import ScrollContextProvider from "./pages/home/contexts/ScrollContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollContextProvider>
        <ThreeContextProvider>
          <CanvasPortalsContextProvider>
            <App />
          </CanvasPortalsContextProvider>
        </ThreeContextProvider>
      </ScrollContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
