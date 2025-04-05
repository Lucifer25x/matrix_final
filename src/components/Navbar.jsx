// Import libraries
import { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiSearchLine, RiHeartLine, RiShoppingBagLine, RiUserLine, RiMenuLine, RiSunLine, RiMoonLine } from "@remixicon/react";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import { useCart } from "react-use-cart";
import supabase from "../utils/supabase";
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
    const { user, loading } = useContext(UserContext);
    const [sidebar, setSidebar] = useState(false);
    const [name, setName] = useState();
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

        // Fetch name of user
        const fetchName = async () => {
            const res = await supabase
                .from("user_info")
                .select("name, surname")
                .eq("user_id", user.id)
                .single();

            if (res.error) {
                console.error(res.error.message);
            } else {
                // setName(res.dres.data.name);
                setName(`${res.data.surname[0]}. ${res.data.name}`);
            }
        }

        // Get user info if logged in
        if (user) {
            fetchName();
        }

        // Close sidebar when location changes
        setSidebar(false);
        document.body.style.overflowY = "auto";
    }, [location, user, loading]);

    const handleSidebar = () => {
        setSidebar(!sidebar);

        // Disable scrolling when sidebar is open on mobile
        const windowWidth = window.innerWidth;
        if (windowWidth <= 800) {
            document.body.style.overflowY = sidebar ? "auto" : "hidden";
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchRef.current.value.trim().length) {
            window.location.href = "/products";
            return;
        }
        window.location.href = `/products?s=${searchRef.current.value}`;
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
                            {name ? <p>{name}</p> : <p>Login</p>}
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