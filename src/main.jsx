// Import libraries
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"

// Import styles
import "./assets/styles/index.css"

// Import context provider
import ContextProvider from "./context/ContextProvider.jsx"

createRoot(document.getElementById("root")).render(
    <ContextProvider>
        <App />
    </ContextProvider>
)
