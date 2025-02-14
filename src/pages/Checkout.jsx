// Import libraries
import { useEffect } from "react";

// Import styles
import "../assets/styles/pages/Checkout.css";

// Checkout page
const Checkout = () => {
    useEffect(() => {
        document.title = "Checkout | The Record Hub";
    }, []);

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>

            <div className="section">
                <h2>Delivery</h2>
                <input type="text" placeholder="Country/Region" />
                <div className="flex">
                    <input type="text" placeholder="First name" />
                    <input type="text" placeholder="Last name" />
                </div>
                <input type="text" placeholder="Address" />
                <div className="flex">
                    <input type="text" placeholder="Postal code" />
                    <input type="text" placeholder="City" />
                </div>
                <input type="text" placeholder="Phone" />
            </div>

            <div className="section">
                <h2>Payment</h2>

                <input type="text" placeholder="Card number" />
                <div className="flex">
                    <input type="text" placeholder="Expiration date (MM/YY)" />
                    <input type="text" placeholder="Security Code" />
                </div>
                <input type="text" placeholder="Name on card" />
            </div>

            <label>
                <input type="checkbox" />
                <span>Save my payment information</span>
            </label>

            <button>Pay now</button>
        </div>
    )
}

export default Checkout