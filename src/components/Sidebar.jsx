// Import libraries
import { useState, useContext, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiCloseLine, RiArrowDropDownLine } from "@remixicon/react";
import { LangContext } from "../context/LangContext";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/components/Sidebar.css";

// Sidebar component
const Sidebar = ({ sidebar, handleSidebar }) => {
    const { lang, toggleLang } = useContext(LangContext);
    const [help, setHelp] = useState(false);
    const searchRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        // Get search parameter from URL if needed
        if (location.pathname !== "/products") {
            searchRef.current.value = "";
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            const search = urlParams.get('s');
            if (search) {
                searchRef.current.value = search;
            }
        }

        // Close the accordion if needed
        setHelp(location.pathname === "/contact" || location.pathname === "/faq");
    }, [location]);

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchRef.current.value.trim().length) {
            window.location.href = "/products";
            return;
        }
        window.location.href = `/products?s=${searchRef.current.value}`;
    }

    return (
        <div className="sidebar" style={{ right: sidebar ? "0" : "-100%" }}>
            <div className="close">
                <button onClick={handleSidebar}><RiCloseLine size={30} /></button>
            </div>
            <form className="search" onSubmit={handleSearch}>
                <input type="text" placeholder={lang == "AZ" ? "Axtar" : "Search"} ref={searchRef} />
            </form>
            <div className="links">
                <NavLink to={"/about"}><StaticLang en="ABOUT US" az="HAQQIMIZDA" /></NavLink>
                <NavLink to={"/products"}><StaticLang en="PRODUCTS" az="MƏHSULLAR" /></NavLink>
                <NavLink to={"/blogs"}><StaticLang en="BLOGS" az="BLOGLAR" /></NavLink>
                <p onClick={() => setHelp(!help)} className={help ? 'open' : ''}><StaticLang en="HELP" az="YARDIM" /> <RiArrowDropDownLine size={30} /></p>
                <div className={`help ${help ? "active" : ""}`}>
                    <NavLink to={"/faq"}>FAQ</NavLink>
                    <NavLink to={"/contact"}><StaticLang en="CONTACT" az="ƏLAQƏ" /></NavLink>
                </div>
            </div>

            <div className="language">
                <button onClick={toggleLang}>{lang == "EN" ? "AZ" : "EN"}</button>
            </div>
        </div>
    )
}

export default Sidebar