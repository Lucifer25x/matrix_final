// Import libraries
import { RiCloseLine, RiLockLine } from "@remixicon/react";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Import styles
import "../assets/styles/pages/Cart.css";

const Cart = () => {
    const { items, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();

    const handleClearCart = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, clear it!"
        }).then((result) => {
            if (result.isConfirmed) {
                emptyCart();
                Swal.fire({
                    text: "Cart has been cleared!",
                    icon: "success"
                });
            }
        });
    }

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
                <span>${cartTotal}</span>
            </div>


            <div className="checkout">
                <Link to={"/checkout"}><RiLockLine size={25} /> <span>CHECKOUT</span></Link>
            </div>

            <div className="clear-cart">
                <button onClick={handleClearCart} disabled={(items.length === 0)}>CLEAR SHOPPING BAG</button>
            </div>
        </div>
    )
}

export default Cart