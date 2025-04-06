// Import libraries
import { useContext } from "react";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import { MoonLoader } from "react-spinners";
import StaticLang from "../utils/StaticLang";
import useBanner from "../hooks/useBanner";
import { LangContext } from "../context/LangContext";

// Import styles
import "../assets/styles/components/BannerEditor.css";

// Banner Editor component
const BannerEditor = () => {
    const { banners, updateBannerData } = useBanner();
    const { lang } = useContext(LangContext);

    // Add accordion functionality to the banners
    const handleAccordion = (e) => {
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

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const image_url = e.target[0].value;
        const title = e.target[1].value;
        const url = e.target[2].value;
        const id = e.target.id;

        // Update the banner
        updateBannerData(id, { image: image_url, title, url });

        // Close the accordion
        const parent = e.target.parentElement.parentElement;
        parent.classList.remove("open");
        parent.childNodes[1].style.maxHeight = "0px";
    }

    // Handle moving banner's order
    const handleMove = (id, direction) => {
        const banner = banners.find(banner => banner.id == id);
        const order = banner.order_num;

        if (direction == "up" && order == 1) {
            return;
        }

        if (direction == "down" && order == banners.length) {
            return;
        }

        const neededBanner = banners.find(banner => banner.order_num == (direction == "up" ? order - 1 : order + 1));

        // Update the order of the banners
        updateBannerData(id, { order_num: neededBanner.order_num });
        updateBannerData(neededBanner.id, { order_num: order });

        // Set inputs to values of the needed banner
        const form = document.getElementById(id);
        form[0].value = neededBanner.image;
        form[1].value = neededBanner.title;
        form[2].value = neededBanner.url;

        // Set inputs of the needed banner to values of the current banner
        const neededForm = document.getElementById(neededBanner.id);
        neededForm[0].value = banner.image;
        neededForm[1].value = banner.title;
        neededForm[2].value = banner.url;
    }

    return (
        <div className="banner-editor" >
            {banners.length == 0 && (
                <div className="loader">
                    <MoonLoader color={"var(--text-color)"} size={75} />
                </div>
            )}

            {banners.map((banner, i) => (
                <div className="banner" key={i}>
                    <div className="header">
                        <div className="left" onClick={handleAccordion}>
                            <h2>{banner.title}</h2>
                        </div>
                        <div className="right">
                            <RiArrowDownLine size={30} onClick={() => handleMove(banner.id, "down")} />
                            <RiArrowUpLine size={30} onClick={() => handleMove(banner.id, "up")} />
                        </div>
                    </div>
                    <div className="editor">
                        <form onSubmit={handleSubmit} id={banner.id}>
                            <label>
                                <p><StaticLang en="Image URL" az="Şəkil URL'i" />:</p>
                                <input type="text" defaultValue={banner.image} placeholder={lang == "AZ" ? "Şəkil URLi" : "Image url"} required />
                            </label>
                            <label>
                                <p><StaticLang en="Title" az="Başlıq" />:</p>
                                <input type="text" defaultValue={banner.title} placeholder={lang == "AZ" ? "Başlıq" : "Title"} required />
                            </label>
                            <label>
                                <p>URL:</p>
                                <input type="text" defaultValue={banner.url} placeholder="URL" required />
                            </label>
                            <button><StaticLang en="Submit" az="Təsdiqlə" /></button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BannerEditor;