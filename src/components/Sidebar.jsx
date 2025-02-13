// Import libraries
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { RiCloseLine, RiArrowDropUpLine } from "@remixicon/react";
import { LangContext } from "../context/LangContext";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/components/Sidebar.css";

// TODO: Implement a better translation and links
// Sidebar component
const Sidebar = ({ sidebar, handleSidebar }) => {
    const { lang, toggleLang } = useContext(LangContext);
    const [help, setHelp] = useState(false);

    return (
        <div className="sidebar" style={{ right: sidebar ? "0" : "-100%" }}>
            <div className="close">
                <button onClick={handleSidebar}><RiCloseLine size={30} /></button>
            </div>
            <div className="links">
                <Link to={"/products"}><StaticLang en="PRODUCTS" az="MƏHSULLAR" /></Link>
                <Link to={"/blogs"}><StaticLang en="BLOGS" az="BLOGLAR" /></Link>
                <Link to={"/sales"}><StaticLang en="SALE" az="ENDİRİMLƏR" /></Link>
                <p onClick={() => setHelp(!help)} className={help ? '' : 'open'}><StaticLang en="HELP" az="YARDIM" /> <RiArrowDropUpLine size={30} /></p>
                <div className={`help ${help ? "active" : ""}`}>
                    <Link to={"/about"}><StaticLang en="ABOUT US" az="HAQQIMIZDA" /></Link>
                    <Link to={"/faq"}>FAQ</Link>
                    <Link to={"/contact"}><StaticLang en="CONTACT" az="ƏLAQƏ" /></Link>
                </div>
            </div>

            <div className="language">
                <button onClick={toggleLang}>{lang == "EN" ? "AZ" : "EN"}</button>
            </div>
        </div>
    )
}

export default Sidebar