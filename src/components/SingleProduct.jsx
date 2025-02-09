// Import libraries
import { RiHeartLine } from "@remixicon/react";
import { useCart } from "react-use-cart";
import { toast, Bounce } from "react-toastify";

// Import styles
import "../assets/styles/components/Product.css";
import { Link } from "react-router-dom";

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
        <div className="product">
            <div className="img">
                <img src={product.img} alt={product.title} />
                <RiHeartLine size={30} />
                <div className="add" onClick={handleAddToCart}>
                    <p>ADD TO CART</p>
                </div>
            </div>
            <div className="info">
                <Link to={`/product/${product.id}`}>
                    <h3>{product.title}</h3>
                </Link>
                <p>{product.desc}</p>
                <p>${product.price}</p>
            </div>
        </div>
    )
}

export default Product