// Import libraries
import { useState, useEffect, useRef } from "react";
import { RiCloseLine, RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import Swal from "sweetalert2";
import supabase from "../utils/supabase";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/components/BannerEditor.css";

// TODO: Implement fully functional banner editor
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
        // const parent = e.target.classList.contains("header") ? e.target.parentElement : e.target.parentElement.parentElement;
        const parent = e.target.closest(".banner");
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
        const id = e.target.id;

        // Update the banner
        const { data, error } = await supabase
            .from("banners")
            .update({ image: image_url, title: title, url: url})
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
                            ? { ...banner, image: image_url, title, url }
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

    // Move banner up
    const handleMoveUp = async (id) => {
        const banner = banners.find(banner => banner.id == id);
        const order = banner.order_num;

        if (order == 1) {
            return;
        }

        const prevBanner = banners.find(banner => banner.order_num == order - 1);

        // Update the order number of the previous banner
        await supabase
            .from("banners")
            .update({ order_num: order })
            .eq("id", prevBanner.id);

        // Update the order number of the current banner
        await supabase
            .from("banners")
            .update({ order_num: order - 1 })
            .eq("id", id);

        // Change state of the banners
        setBanners(prevBanners =>
            prevBanners
                .map(banner =>
                    banner.id == prevBanner.id
                        ? { ...banner, order_num: order }
                        : banner
                )
                .map(banner =>
                    banner.id == id
                        ? { ...banner, order_num: order - 1 }
                        : banner
                )
                .sort((a, b) => a.order_num - b.order_num)
        );
    }

    // Move banner down
    const handleMoveDown = async (id) => {
        const banner = banners.find(banner => banner.id == id);
        const order = banner.order_num;

        if (order == banners.length) {
            return;
        }

        const nextBanner = banners.find(banner => banner.order_num == order + 1);

        // Update the order number of the next banner
        await supabase
            .from("banners")
            .update({ order_num: order })
            .eq("id", nextBanner.id);

        // Update the order number of the current banner
        await supabase
            .from("banners")
            .update({ order_num: order + 1 })
            .eq("id", id);

        // Change state of the banners
        setBanners(prevBanners =>
            prevBanners
                .map(banner =>
                    banner.id == nextBanner.id
                        ? { ...banner, order_num: order }
                        : banner
                )
                .map(banner =>
                    banner.id == id
                        ? { ...banner, order_num: order + 1 }
                        : banner
                )
                .sort((a, b) => a.order_num - b.order_num)
        );
    }

    return (
        <div className={`banner-editor ${!show ? 'hidden' : ''}`}>
            <div className="layer"></div>
            <div className="content">
                <div className="close" onClick={closeBanner}><RiCloseLine size={30} /></div>
                <h1><StaticLang en="Editor" az="Redaktor" /></h1>

                <div className="banners">
                    {banners.map((banner, i) => (
                        <div className="banner" key={i}>
                            <div className="header">
                                <div className="left" onClick={handleAccordion}>
                                    <h2>{banner.title}</h2>
                                </div>
                                <div className="right">
                                    <RiArrowDownLine size={30} onClick={() => handleMoveDown(banner.id)} />
                                    <RiArrowUpLine size={30} onClick={() => handleMoveUp(banner.id)} />
                                </div>
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