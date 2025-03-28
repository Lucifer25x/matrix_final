// Import libraries
import { useState } from "react";
import { RiHeartLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { toast, Bounce } from "react-toastify";
import useWishlist from "../hooks/useWishlist";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/components/Product.css";

// Product component
const Product = ({ product, animate = false }) => {
    const { addItem } = useCart();
    const { addWishlist, removeWishlist, isInWishlist } = useWishlist();
    const [animateRemove, setAnimateRemove] = useState(false);
    const [hideProduct, setHideProduct] = useState(false);

    const handleAddToCart = () => {
        addItem(product);

        toast.success("Product was added to your cart!", {
            position: "bottom-right",
            autoClose: 3000,
            closeOnClick: false,
            theme: "colored",
            transition: Bounce,
        });
    }

    const handleWishlist = async () => {
        if (isInWishlist(product.id)) {
            removeWishlist(product.id).then(() => {
                if (animate) {
                    setAnimateRemove(true);
                    setTimeout(() => {
                        setHideProduct(true);
                    }, 350);
                }
            }
            );
        } else {
            const res = await addWishlist(product.id);

            if (res) {
                toast.success("Product was added to your wishlist!", {
                    position: "bottom-right",
                    autoClose: 3000,
                    closeOnClick: false,
                    theme: "colored",
                    transition: Bounce,
                });
            } else {
                toast.error("You need to login to add products to your wishlist!", {
                    position: "bottom-right",
                    autoClose: 3000,
                    closeOnClick: false,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        }
    }

    return (
        <div className={`single-product ${animateRemove ? `animate-remove` : ""} ${hideProduct ? `hidden` : ""}`}>
            <div className="img">
                <img src={product.img} alt={product.title} />
                <div onClick={handleWishlist} className={`heart ${isInWishlist(product.id) ? "active" : ""}`} >
                    <RiHeartLine size={30} />
                </div>
                {product.stock ? (
                    <div className="add" onClick={handleAddToCart}>
                        <p><StaticLang en="ADD TO CART" az="SƏBƏTƏ ƏLAVƏ EDİN" /></p>
                    </div>
                ) : (
                    <div className="out-of-stock">
                        <p><StaticLang en="OUT OF STOCK" az="MÖVCUD DEYİL" /></p>
                    </div>
                )}
            </div>
            <div className="info">
                <Link to={`/product/${product.id}`}>
                    <h3>{product.title}</h3>
                </Link>
                <p>{product.artist}</p>
                <p>${product.price}</p>
            </div>
        </div>
    )
}

export default Product