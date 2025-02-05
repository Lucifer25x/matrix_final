import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./assets/styles/index.css"

// Import context providers
import { ThemeProvider } from "./context/ThemeContext"
import { LangProvider } from "./context/LangContext.jsx"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <LangProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </LangProvider>
    </StrictMode>,
)
