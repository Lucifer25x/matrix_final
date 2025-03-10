// Import libraries
import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiCloseLine, RiArrowDropUpLine } from "@remixicon/react";
import { LangContext } from "../context/LangContext";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/components/Sidebar.css";

// Sidebar component
const Sidebar = ({ sidebar, handleSidebar }) => {
    const { lang, toggleLang } = useContext(LangContext);
    const [help, setHelp] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        // Check if there's a search parameter in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const search = urlParams.get('s');
        if (search) {
            searchRef.current.value = search;
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchRef.current.value.trim().length) {
            window.location.href = "/products";
            return;
        }
        window.location.href = `/products/?s=${searchRef.current.value}`;
    }

    return (
        <div className="sidebar" style={{ right: sidebar ? "0" : "-100%" }}>
            <div className="close">
                <button onClick={handleSidebar}><RiCloseLine size={30} /></button>
            </div>
            <form className="search" onSubmit={handleSearch}>
                <input type="text" placeholder="Search..." ref={searchRef} />
            </form>
            <div className="links">
                <Link to={"/about"}><StaticLang en="ABOUT US" az="HAQQIMIZDA" /></Link>
                <Link to={"/products"}><StaticLang en="PRODUCTS" az="MƏHSULLAR" /></Link>
                <Link to={"/blogs"}><StaticLang en="BLOGS" az="BLOGLAR" /></Link>
                {/* <Link to={"/sales"}><StaticLang en="SALE" az="ENDİRİMLƏR" /></Link> */}
                <p onClick={() => setHelp(!help)} className={help ? '' : 'open'}><StaticLang en="HELP" az="YARDIM" /> <RiArrowDropUpLine size={30} /></p>
                <div className={`help ${help ? "active" : ""}`}>
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