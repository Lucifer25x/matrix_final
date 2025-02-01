// Import libraries
import { Link } from "react-router-dom";
import { RiSearchLine, RiHeartLine, RiShoppingBagLine, RiUserLine, RiMenuLine } from "@remixicon/react";
import { useState } from "react";

// Import components
import Sidebar from "./Sidebar";

// Import styles
import "../assets/styles/components/Navbar.css";

// Import logo
import logo from "../assets/images/logo.avif";

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);

    const handleSidebar = () => {
        setSidebar(!sidebar);
        document.body.style.overflow = sidebar ? "auto" : "hidden";
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
                        <input type="text" placeholder="Search" />
                        <button><RiSearchLine size={25} /></button>
                    </div>
                    <div className="buttons">
                        <div className="links">
                            <Link to={"/wishlist"}>
                                <RiHeartLine size={25} />
                                <span>0</span>
                            </Link>
                            <Link to={"/cart"}>
                                <RiShoppingBagLine size={25} />
                                <span>0</span>
                            </Link>
                            <Link to={"/login"}>
                                <RiUserLine size={25} />
                            </Link>
                        </div>
                        <div className="menu" onClick={handleSidebar}>
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