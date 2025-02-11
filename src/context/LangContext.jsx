// Import libraries
import { createContext, useEffect, useState } from "react";

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('lang') || "EN");

    useEffect(() => {
        localStorage.setItem('lang', lang);
    }, [lang]);

    const toggleLang = () => {
        setLang(state => state === "EN" ? "AZ" : "EN");
    }

    return <LangContext.Provider value={{lang, toggleLang}}>{children}</LangContext.Provider>
}