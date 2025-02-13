// Import libraries
import { Link } from "react-router-dom";
import { RiHeartLine } from "@remixicon/react";
import { useCart } from "react-use-cart";
import { toast, Bounce } from "react-toastify";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/components/ProductListView.css";

// Constants
const max_description_length = 200;

// Single product list view component
const SingleProductListView = ({ product }) => {
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
        <div className="single-product-list-view">
            <div className="product-img">
                <img src={product.img} alt={product.title} />
                <RiHeartLine size={25} />
            </div>
            <div className="product-info">
                <div className="info-top">
                    <div className="info-flex">
                        <p>{product.artist}</p>
                        <p>${product.price}</p>
                    </div>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                </div>
                <p>{product.description.length > max_description_length ? `${product.description.substring(0, max_description_length)}...` : product.description}</p>
                {
                    product.stock ? (
                        <div className="add" onClick={handleAddToCart}>
                            <p><StaticLang en="ADD TO CART" az="SƏBƏTƏ ƏLAVƏ EDİN"/></p>
                        </div>
                    ) : (
                        <div className="out-of-stock">
                            <p><StaticLang en="OUT OF STOCK" az="MÖVCUD DEYİL"/></p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default SingleProductListView;