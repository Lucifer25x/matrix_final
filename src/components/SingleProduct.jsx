// Import libraries
import { Link } from "react-router-dom";
import { RiHeartLine } from "@remixicon/react";
import { useCart } from "react-use-cart";
import { toast, Bounce } from "react-toastify";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/components/Product.css";

// Product component
const Product = ({ product }) => {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem(product);

        toast.success("Product was added to your cart!", {
            position: "bottom-center",
            autoClose: 3000,
            closeOnClick: false,
            theme: "colored",
            transition: Bounce,
        });
    }

    return (
        <div className="single-product">
            <div className="img">
                <img src={product.img} alt={product.title} />
                <RiHeartLine size={30} />
                {product.stock ? (
                    <div className="add" onClick={handleAddToCart}>
                        <p><StaticLang en="ADD TO CART" az="SƏBƏTƏ ƏLAVƏ EDİN"/></p>
                    </div>
                ) : (
                    <div className="out-of-stock">
                        <p><StaticLang en="OUT OF STOCK" az="MÖVCUD DEYİL"/></p>
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