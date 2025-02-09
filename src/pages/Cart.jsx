// Import libraries
import { RiCloseLine, RiLockLine } from "@remixicon/react";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";

// Import styles
import "../assets/styles/pages/Cart.css";
import { useEffect } from "react";

const Cart = () => {
    const { items, updateItemQuantity, removeItem } = useCart();

    useEffect(() => {
        console.log(items)
    }, []);

    return (
        <div className="cart-page">
            <h1>Shopping Bag</h1>

            <table>
                <thead>
                    <tr>
                        <th>PRODUCTS</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                        <th>REMOVE</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="product">
                                <img src={item.img} alt={item.title} />
                                <div className="details">
                                    <p className="artist">{item.artist}</p>
                                    <Link to={"/"} className="title">{item.title}</Link>
                                </div>
                            </td>
                            <td>${item.price}</td>
                            <td>
                                <div className="quantity">
                                    <button onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) - 1)}>-</button>
                                    <div className="count">{item.quantity}</div>
                                    <button onClick={() => { updateItemQuantity(item.id, (item.quantity ?? 0) + 1) }}>+</button>
                                </div>
                            </td>
                            <td>${item.price * item.quantity}</td>
                            <td className="remove">
                                <button onClick={() => removeItem(item.id)}>
                                    <RiCloseLine size={30} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="subtotal">
                <p>Subtotal:</p>
                <span>$60</span>
            </div>

            <div className="checkout">
                <Link to={"/checkout"}><RiLockLine size={25} /> <span>CHECKOUT</span></Link>
            </div>
        </div>
    )
}

export default Cart