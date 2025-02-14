// Import libraries
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"

// Import styles
import "./assets/styles/index.css"

// Import context providers
import { CartProvider } from "react-use-cart";
import { ThemeProvider } from "./context/ThemeContext"
import { LangProvider } from "./context/LangContext.jsx"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CartProvider>
            <LangProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </LangProvider>
        </CartProvider>
    </StrictMode>,
)
