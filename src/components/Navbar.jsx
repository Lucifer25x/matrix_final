// Import necessary libraries
import { Link } from "react-router-dom";
import { RiSearchLine, RiHeartLine, RiShoppingBagLine, RiUserLine, RiMenuLine } from "@remixicon/react";

// Import styles
import "../assets/styles/components/Navbar.css";

// Import logo
import logo from "../assets/images/logo.avif";

const Navbar = () => {
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
                        <div className="menu">
                            <RiMenuLine size={25} />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar