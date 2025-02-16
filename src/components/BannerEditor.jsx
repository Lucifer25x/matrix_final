// Import libraries
import { RiCloseLine, RiArrowDownLine } from "@remixicon/react";
import supabase from "../utils/supabase";

// Import styles
import "../assets/styles/components/BannerEditor.css";

// TODO: Implement fully functional banner editor
// Banner Editor component
const BannerEditor = ({ show, handleBanner }) => {
    // Fetch banner data by order column
    const fetchBanner = async (order) => {
        const { data, error } = await supabase
            .from("banners")
            .select("*")
            .eq("order_num", order);

        if (error) {
            console.error(error);
        }

        return data;
    }

    // Add accordion functionality to the banners
    const handleAccordion = (e) => {
        const parent = e.target.parentElement;
        parent.classList.toggle("open");

        if (parent.classList.contains("open")) {
            // Get the order of banner by knowing which child of the parent is clicked
            const order = Array.from(parent.parentElement.children).indexOf(parent) + 1;
            fetchBanner(order).then(data => {
                const inputs = parent.querySelectorAll("input");
                inputs[0].value = data[0].image;
                inputs[1].value = data[0].title;
                inputs[2].value = data[0].url;
                inputs[3].value = data[0].order_num;
            });
        }

        // Close other accordions
        const banners = document.querySelectorAll(".banner");
        banners.forEach(banner => {
            if (banner != parent) {
                banner.classList.remove("open");
            }
        });
    }

    return (
        <div className={`banner-editor ${!show ? 'hidden' : ''}`}>
            <div className="layer"></div>
            <div className="content">
                <div className="close" onClick={handleBanner}><RiCloseLine size={30} /></div>
                <h1>Editor</h1>

                <div className="banners">
                    <div className="banner">
                        <div className="header" onClick={handleAccordion}>
                            <h2>Banner 1</h2>
                            <div className="open-btn">
                                <RiArrowDownLine size={25} />
                            </div>
                        </div>
                        <div className="editor">
                            <label>
                                <p>Image URL:</p>
                                <input type="text" placeholder="Image url" />
                            </label>
                            <label>
                                <p>Title:</p>
                                <input type="text" placeholder="Title" />
                            </label>
                            <label>
                                <p>URL:</p>
                                <input type="text" placeholder="URL" />
                            </label>
                            <label>
                                <p>Order:</p>
                                <input type="number" placeholder="Order" />
                            </label>
                            <button>Submit</button>
                        </div>
                    </div>
                    <div className="banner">
                        <div className="header" onClick={handleAccordion}>
                            <h2>Banner 2</h2>
                            <div className="open-btn">
                                <RiArrowDownLine size={25} />
                            </div>
                        </div>
                        <div className="editor">
                            <label>
                                <p>Image URL:</p>
                                <input type="text" placeholder="Image url" />
                            </label>
                            <label>
                                <p>Title:</p>
                                <input type="text" placeholder="Title" />
                            </label>
                            <label>
                                <p>URL:</p>
                                <input type="text" placeholder="URL" />
                            </label>
                            <label>
                                <p>Order:</p>
                                <input type="number" placeholder="Order" />
                            </label>
                            <button>Submit</button>
                        </div>
                    </div>
                    <div className="banner">
                        <div className="header" onClick={handleAccordion}>
                            <h2>Banner 3</h2>
                            <div className="open-btn">
                                <RiArrowDownLine size={25} />
                            </div>
                        </div>
                        <div className="editor">
                            <label>
                                <p>Image URL:</p>
                                <input type="text" placeholder="Image url" />
                            </label>
                            <label>
                                <p>Title:</p>
                                <input type="text" placeholder="Title" />
                            </label>
                            <label>
                                <p>URL:</p>
                                <input type="text" placeholder="URL" />
                            </label>
                            <label>
                                <p>Order:</p>
                                <input type="number" placeholder="Order" />
                            </label>
                            <button>Submit</button>
                        </div>
                    </div>
                    <div className="banner">
                        <div className="header" onClick={handleAccordion}>
                            <h2>Banner 4</h2>
                            <div className="open-btn">
                                <RiArrowDownLine size={25} />
                            </div>
                        </div>
                        <div className="editor">
                            <label>
                                <p>Image URL:</p>
                                <input type="text" placeholder="Image url" />
                            </label>
                            <label>
                                <p>Title:</p>
                                <input type="text" placeholder="Title" />
                            </label>
                            <label>
                                <p>URL:</p>
                                <input type="text" placeholder="URL" />
                            </label>
                            <label>
                                <p>Order:</p>
                                <input type="number" placeholder="Order" />
                            </label>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerEditor;