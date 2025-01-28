import { RiSearchLine, RiHeartLine, RiShoppingCartLine, RiUserLine, RiMenuLine, RiCloseLine, RiMoonLine, RiSunLine } from "@remixicon/react"
import { Link, NavLink } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { ThemeContext } from "../context/ThemeContext"

const Navbar = () => {
    const [theme, toggleTheme] = useContext(ThemeContext);

    const [open, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen(!open);
    }

    useEffect(() => {
        if(open){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme, open]);

    return (
        <>
            <nav>
                <div className="logo">
                    <Link to="/">Kafka</Link>
                </div>
                <div className="search">
                    <input type="text" placeholder="Search for anything..." />
                    <button><RiSearchLine size={25} /></button>
                </div>
                <div className="right">
                    <div>
                        <NavLink to="/"><RiHeartLine /></NavLink>
                        <span>2</span>
                    </div>
                    <div>
                        <NavLink to="/"><RiShoppingCartLine /></NavLink>
                        <span>3</span>
                    </div>
                    <button onClick={toggleTheme}>{theme === 'light' ? <RiMoonLine/> : <RiSunLine/>}</button>
                    <div>
                        <NavLink to="/"><RiUserLine /></NavLink>
                    </div>
                    <button onClick={toggleMenu}><RiMenuLine /></button>
                </div>
            </nav>

            <div className={`sidebar_menu ${open ? 'open' : ''}`}>
                <button onClick={toggleMenu} className="close"><RiCloseLine size={30} /></button>
                <div className="search">
                    <input type="text" placeholder="Search for anything..." />
                    <button><RiSearchLine size={25} /></button>
                </div>
                <div className="menu">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/products">Products</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
                
            </div>
        </>
    )
}

export default Navbar