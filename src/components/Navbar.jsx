// Import libraries
import { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiSearchLine, RiHeartLine, RiShoppingBagLine, RiUserLine, RiMenuLine, RiSunLine, RiMoonLine } from "@remixicon/react";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import { useCart } from "react-use-cart";
import useWishlist from "../hooks/useWishlist";

// Import components
import Sidebar from "./Sidebar";

// Import styles
import "../assets/styles/components/Navbar.css";

// Import logo
import logo from "../assets/images/logo.avif";

// Navbar component
const Navbar = () => {
    const { totalItems } = useCart();
    const { wishlistCount } = useWishlist();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const [sidebar, setSidebar] = useState(false);
    const searchRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        // Check if there's a search parameter in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const search = urlParams.get('s');
        if (search) {
            searchRef.current.value = search;
        }

        // Close sidebar when location changes
        setSidebar(false);
        document.body.style.overflow = "auto";
    }, [location]);

    const handleSidebar = () => {
        setSidebar(!sidebar);
        document.body.style.overflow = sidebar ? "auto" : "hidden";
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchRef.current.value.trim().length) {
            window.location.href = "/products";
            return;
        }
        window.location.href = `/products/?s=${searchRef.current.value}`;
    }

    return (
        <>
            <nav>
                <div className="container">
                    <div className="logo">
                        <Link to={"/"}>
                            <img src={logo} alt="The Record Hub" width={130} />
                        </Link>
                    </div>
                    <div className="search">
                        <form onSubmit={handleSearch}>
                            <input type="text" placeholder="Search" ref={searchRef} />
                            <button><RiSearchLine size={25} /></button>
                        </form>
                    </div>
                    <div className="buttons">
                        <div className="links">
                            <Link to={"/wishlist"}>
                                <RiHeartLine size={25} />
                                <span>{wishlistCount}</span>
                            </Link>
                            <Link to={"/cart"}>
                                <RiShoppingBagLine size={25} />
                                <span>{totalItems}</span>
                            </Link>
                        </div>
                        <div className="button">
                            {theme === "light" ? (
                                <RiMoonLine size={25} onClick={toggleTheme} />
                            ) : (
                                <RiSunLine size={25} onClick={toggleTheme} />
                            )}
                        </div>
                        <Link to={"/account"} className="account">
                            <RiUserLine size={20} />
                            {user ? <p>{user.email.split("@")[0]}</p> : <p>Login</p>}
                        </Link>
                        <div className="menu-btn button" onClick={handleSidebar}>
                            <RiMenuLine size={25} />
                        </div>
                    </div>
                </div>
            </nav>

            <Sidebar sidebar={sidebar} handleSidebar={handleSidebar} />
        </>
    )
}

export default Navbar