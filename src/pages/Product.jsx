// Import libraries
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RiHeartLine } from "@remixicon/react";
import { MoonLoader } from "react-spinners";
import { useCart } from "react-use-cart";
import { toast, Bounce } from "react-toastify";
import supabase from "../utils/supabase";

// Import styles
import "../assets/styles/pages/Product.css"

const Product = () => {
    const { id } = useParams()
    const { addItem } = useCart();
    const [loading, setLoading] = useState(true)
    const [productDetails, setProductDetails] = useState(null)

    useEffect(() => {
        const getProduct = async () => {
            const { data, error } = await supabase.from("vinyls").select("*").eq("id", id);
            if (error) {
                console.log(error)
            } else {
                setProductDetails(data[0])
            }
        }

        getProduct();

        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, []);

    const handleAddToCart = () => {
        addItem(productDetails);

        toast.success("Product was added to your cart!", {
            position: "bottom-center",
            autoClose: 3000,
            closeOnClick: false,
            theme: "colored",
            transition: Bounce,
        });
    }

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
                <MoonLoader color={"var(--text-color)"} size={75} />
            </div>
        )
    }

    return (
        <div className="product-details-page">
            <div className="general">
                <div className="img">
                    <img src={productDetails.img} alt={productDetails.title} />
                </div>

                <div className="about">
                    <h2 className="artist">{productDetails.artist}</h2>
                    <p className="title">{productDetails.title}</p>
                    <p className="label">{productDetails.label}</p>
                    <p className="price">${productDetails.price}</p>

                    <div className="buttons">
                        <button onClick={handleAddToCart} disabled={!productDetails.stock}>ADD TO CART</button>
                        <div className="add-wishlist" title="Add to wishlist">
                            <RiHeartLine size={30} />
                        </div>
                    </div>

                    <div className="details">
                        <p><b>Format:</b> {productDetails.format}</p>
                        <p><b>Color:</b> {productDetails.color}</p>
                        <p><b>Genre:</b> {productDetails.genre}</p>
                        <p><b>Release Year:</b> {productDetails.release_year}</p>
                    </div>
                </div>
            </div>

            <div className="description">
                {productDetails.description}
            </div>

            {productDetails.tracks.length > 0 && (
                <div className="tracklist">
                    <h2>Tracklist</h2>
                    <ul>
                        {productDetails.tracks.map((track, index) => (
                            <li key={index}>{index + 1}. {track}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Product