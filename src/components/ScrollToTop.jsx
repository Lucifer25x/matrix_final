// Import libraries
import { useEffect, useState } from "react";
import { RiArrowUpSLine } from "@remixicon/react";

// Import styles
import "../assets/styles/components/ScrollToTop.css";

// ScrollToTop component
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled
    const toggleVisibility = () => {
        if (window.scrollY > 150) {
            setIsVisible(true);

            // Add box shadow to the navbar
            document.querySelector("nav").classList.add("shadow");
        } else {
            setIsVisible(false);

            // Remove box shadow from the navbar
            document.querySelector("nav").classList.remove("shadow");
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