// Import libraries
import { useEffect, useContext } from "react";
import { RiCloseLine, RiLockLine } from "@remixicon/react";
import { useCart } from "react-use-cart";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import StaticLang from "../utils/StaticLang";
import { UserContext } from "../context/UserContext";

// Import styles
import "../assets/styles/pages/Cart.css";

// Cart page
const Cart = () => {
    const { items, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Cart | The Record Hub";
    }, []);

    const handleClearCart = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00b41b",
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

    const handleRemoveItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00b41b",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                removeItem(id);
                Swal.fire({
                    text: "Item has been removed!",
                    icon: "success"
                });
            }
        });
    }

    const handleDecrement = (id) => {
        const item = items.find(item => item.id === id);
        if (item.quantity === 1) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#00b41b",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, remove it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    removeItem(id);
                    Swal.fire({
                        text: "Item has been removed!",
                        icon: "success"
                    });
                }
            });
        } else {
            updateItemQuantity(id, (item.quantity ?? 0) - 1);
        }
    }

    const handleCheckout = () => {
        if (user) {
            navigate("/checkout");
        } else {
            Swal.fire({
                title: "You need to login first!",
                icon: "error"
            });
        }
    }

    return (
        <div className="cart-page" data-aos="zoom-in">
            <h1><StaticLang en="Cart" az="Səbət" /></h1>

            <table>
                <thead>
                    <tr>
                        <th><StaticLang en="PRODUCTS" az="MƏHSULLAR" /></th>
                        <th><StaticLang en="PRICE" az="QİYMƏT" /></th>
                        <th><StaticLang en="QUANTITY" az="MİQDAR" /></th>
                        <th><StaticLang en="TOTAL" az="ÜMUMİ" /></th>
                        <th><StaticLang en="REMOVE" az="LƏĞV ET" /></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="product">
                                <img src={item.img} alt={item.title} />
                                <div className="details">
                                    <p className="artist">{item.artist}</p>
                                    <Link to={`/product/${item.id}`} className="title">{item.title}</Link>
                                </div>
                            </td>
                            <td>${item.price}</td>
                            <td>
                                <div className="quantity">
                                    <button onClick={() => handleDecrement(item.id)}>-</button>
                                    <div className="count">{item.quantity}</div>
                                    <button onClick={() => { updateItemQuantity(item.id, (item.quantity ?? 0) + 1) }}>+</button>
                                </div>
                            </td>
                            <td>${item.price * item.quantity}</td>
                            <td className="remove">
                                <button onClick={() => handleRemoveItem(item.id)}>
                                    <RiCloseLine size={30} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="subtotal">
                <p><StaticLang en="Subtotal" az="ÜMUMİ" />:</p>
                <span>${cartTotal}</span>
            </div>


            <div className="checkout">
                <button onClick={handleCheckout} disabled={(items.length === 0)}> <RiLockLine size={25} /> <span><StaticLang en="CHECKOUT" az="SATIN AL" /></span></button>
            </div>

            <div className="clear-cart">
                <button onClick={handleClearCart} disabled={(items.length === 0)}><StaticLang en="CLEAR SHOPPING BAG" az="ALIŞVERİŞ ÇANTASINI TƏMİZLƏYİN" /></button>
            </div>
        </div>
    )
}

export default Cart