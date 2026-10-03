import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");

if (!container) {
    throw new Error('CentPlayer: no element with id "root" found in index.html');
}

createRoot(container).render(
    <StrictMode>
        <App />
    </StrictMode>
);
