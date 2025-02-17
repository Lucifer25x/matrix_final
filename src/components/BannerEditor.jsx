// Import libraries
import { useState, useEffect, useRef } from "react";
import { RiCloseLine, RiArrowDownLine } from "@remixicon/react";
import Swal from "sweetalert2";
import supabase from "../utils/supabase";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/components/BannerEditor.css";

// TODO: Implement fully functional banner editor
// TODO: Instead of allowing the user to edit order number, implement drag and drop functionality
// Banner Editor component
const BannerEditor = ({ show, handleBanner }) => {
    const [banners, setBanners] = useState([]);
    const hasFetched = useRef(false);

    // Fetch banners
    const fetchBanners = async () => {
        const { data, error } = await supabase
            .from("banners")
            .select("*")
            .order("order_num");

        if (error) {
            console.error(error);
        }

        setBanners(data);
    }

    useEffect(() => {
        if (show && !hasFetched.current) {
            fetchBanners();
            hasFetched.current = true;
        }

    }, [show]);

    // Add accordion functionality to the banners
    const handleAccordion = (e) => {
        const parent = e.target.classList.contains("header") ? e.target.parentElement : e.target.parentElement.parentElement;
        parent.classList.toggle("open");

        parent.childNodes[1].style.maxHeight = parent.classList.contains("open") ? parent.childNodes[1].scrollHeight + "px" : "0px";

        // Close other accordions
        const banners = document.querySelectorAll(".banner");
        banners.forEach(banner => {
            if (banner != parent) {
                banner.classList.remove("open");
                banner.childNodes[1].style.maxHeight = "0px";
            }
        });
    }

    // Close all accordions
    const closeAccordions = () => {
        const banners = document.querySelectorAll(".banner");
        banners.forEach(banner => {
            banner.classList.remove("open");
            banner.childNodes[1].style.maxHeight = "0px";
        });
    }

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const image_url = e.target[0].value;
        const title = e.target[1].value;
        const url = e.target[2].value;
        const order = e.target[3].value;
        const id = e.target.id;

        // Update the banner
        const { data, error } = await supabase
            .from("banners")
            .update({ image: image_url, title: title, url: url, order_num: order })
            .eq("id", id);

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while updating the banner"
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Banner updated successfully"
            });

            setBanners(prevBanners => 
                prevBanners
                    .map(banner =>
                        banner.id == id
                            ? { ...banner, image: image_url, title, url, order_num: order }
                            : banner
                    )
                    .sort((a, b) => a.order_num - b.order_num)
            );
        }

        // Close the accordion
        const parent = e.target.parentElement.parentElement;
        parent.classList.remove("open");
        parent.childNodes[1].style.maxHeight = "0px";
    }

    const closeBanner = () => {
        closeAccordions();
        handleBanner();
    }

    return (
        <div className={`banner-editor ${!show ? 'hidden' : ''}`}>
            <div className="layer"></div>
            <div className="content">
                <div className="close" onClick={closeBanner}><RiCloseLine size={30} /></div>
                <h1><StaticLang en="Editor" az="Redaktor"/></h1>

                <div className="banners">
                    {banners.map((banner, i) => (
                        <div className="banner" key={i}>
                            <div className="header" onClick={handleAccordion}>
                                {/* <h2>Banner {i + 1}</h2> */}
                                <h2>{banner.title}</h2>
                                <RiArrowDownLine size={25} />
                            </div>
                            <div className="editor">
                                <form onSubmit={handleSubmit} id={banner.id}>
                                    <label>
                                        <p>Image URL:</p>
                                        <input type="text" defaultValue={banner.image} placeholder="Image url" required />
                                    </label>
                                    <label>
                                        <p>Title:</p>
                                        <input type="text" defaultValue={banner.title} placeholder="Title" required />
                                    </label>
                                    <label>
                                        <p>URL:</p>
                                        <input type="text" defaultValue={banner.url} placeholder="URL" required />
                                    </label>
                                    <label>
                                        <p>Order:</p>
                                        <input type="number" defaultValue={banner.order_num} placeholder="Order" required />
                                    </label>
                                    <button>Submit</button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BannerEditor;