// Import libraries
import { RiHeartLine } from "@remixicon/react";

// Import styles
import "../assets/styles/components/Product.css";

const Product = ({ img, title, desc, price }) => {
    return (
        <div className="product">
            <div className="img">
                <img src={img} alt={title} />
                <RiHeartLine size={30} />
                <div className="add">
                    <p>ADD TO CART</p>
                </div>
            </div>
            <div className="info">
                <h3>{title}</h3>
                <p>{desc}</p>
                <p>${price}</p>
            </div>
        </div>
    )
}

export default Product