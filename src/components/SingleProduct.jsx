// Import libraries
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiHeartLine } from "@remixicon/react";
import { useCart } from "react-use-cart";
import { toast, Bounce } from "react-toastify";

// Import styles
import "../assets/styles/components/Product.css";

const Product = ({ product }) => {
    const { addItem } = useCart();
    const [stock, setStock] = useState(false);

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

    useEffect(() => {
        setStock(product.stock);
    }, [product.stock]);

    return (
        <div className="product">
            <div className="img">
                <img src={product.img} alt={product.title} />
                <RiHeartLine size={30} />
                {stock ? (
                    <div className="add" onClick={handleAddToCart}>
                        <p>ADD TO CART</p>
                    </div>
                ) : (
                    <div className="out-of-stock">
                        <p>OUT OF STOCK</p>
                    </div>
                )}
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