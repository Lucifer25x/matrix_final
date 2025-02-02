// Import libraries
import { useEffect, useState } from "react";
import { RiArrowUpSLine } from "@remixicon/react";

// Import styles
import "../assets/styles/components/ScrollToTop.css";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled
    const toggleVisibility = () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    // Set the top position to 0
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        }
    }, []);

    return (
        <div className={`scroll-to-top ${isVisible ? '' : "hidden"}`} onClick={scrollToTop}>
            <RiArrowUpSLine size={25} />
        </div>
    )
}

export default ScrollToTop