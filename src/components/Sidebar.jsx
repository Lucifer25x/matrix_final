// Import libraries
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { RiCloseLine, RiArrowDropUpLine } from "@remixicon/react";
import { LangContext } from "../context/LangContext";

// Import styles
import "../assets/styles/components/Sidebar.css";

const Sidebar = ({ sidebar, handleSidebar }) => {
    const { lang, toggleLang } = useContext(LangContext);
    const [help, setHelp] = useState(false);

    return (
        <div className="sidebar" style={{ right: sidebar ? "0" : "-100%" }}>
            <div className="close">
                <button onClick={handleSidebar}><RiCloseLine size={30} /></button>
            </div>
            <div className="links">
                <Link to={"/"}>NEW RELEASES</Link>
                <Link to={"/"}>PRE-ORDERS</Link>
                <Link to={"/"}>GIFTS</Link>
                <Link to={"/"}>SALE</Link>
                <p onClick={() => setHelp(!help)} className={help ? '' : 'open'}>HELP <RiArrowDropUpLine size={30} /></p>
                <div className={`help ${help ? "active" : ""}`}>
                    <Link to={"/about"}>ABOUT US</Link>
                    <Link to={"/faq"}>FAQ</Link>
                    <Link to={"/contact"}>CONTACT</Link>
                </div>
            </div>

            <div className="language">
                <button onClick={toggleLang}>{lang == "EN" ? "AZ" : "EN"}</button>
            </div>
        </div>
    )
}

export default Sidebar