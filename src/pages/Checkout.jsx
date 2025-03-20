// Import libraries
import { useEffect, useContext, useRef } from "react";
import { useCart } from "react-use-cart";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Import styles
import "../assets/styles/pages/Checkout.css";

// Checkout page
const Checkout = () => {
    const savedInfo = JSON.parse(localStorage.getItem("paymentInfo") || "{}");
    const { emptyCart } = useCart();
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();

    // Refs
    const countryRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const addressRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();
    const phoneRef = useRef();
    const cardNumberRef = useRef();
    const expirationDateRef = useRef();
    const securityCodeRef = useRef();
    const nameOnCardRef = useRef();
    const savePaymentRef = useRef();

    useEffect(() => {
        if (!user && !loading) {
            navigate("/login")
        }

        // Fill in saved payment information
        cardNumberRef.current.value = savedInfo.cardNumber || "";
        expirationDateRef.current.value = savedInfo.expirationDate || "";
        securityCodeRef.current.value = savedInfo.securityCode || "";
        nameOnCardRef.current.value = savedInfo.nameOnCard || "";

        window.scrollTo(0, 0);
        document.title = "Checkout | The Record Hub";
    }, [user, loading]);

    const handlePay = () => {
        const country = countryRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const address = addressRef.current.value;
        const postalCode = postalCodeRef.current.value;
        const city = cityRef.current.value;
        const phone = phoneRef.current.value;
        const cardNumber = cardNumberRef.current.value;
        const expirationDate = expirationDateRef.current.value;
        const securityCode = securityCodeRef.current.value;
        const nameOnCard = nameOnCardRef.current.value;
        const savePayment = savePaymentRef.current.checked;

        if (!country || !firstName || !lastName || !address || !postalCode || !city || !phone || !cardNumber || !expirationDate || !securityCode || !nameOnCard) {
            Swal.fire({
                text: "Please fill in all fields",
                icon: "warning"
            });
            return;
        }

        if (savePayment) {
            localStorage.setItem("paymentInfo", JSON.stringify({
                cardNumber,
                expirationDate,
                securityCode,
                nameOnCard
            }));
        }

        Swal.fire({
            text: "Payment successful!",
            icon: "success"
        }).then(() => {
            emptyCart();
            navigate("/cart");
        });
    }

    return (
        <div className="checkout-page" data-aos="zoom-in">
            <h1>Checkout</h1>

            <div className="section">
                <h2>Delivery</h2>
                <input type="text" placeholder="Country/Region" ref={countryRef} />
                <div className="flex">
                    <input type="text" placeholder="First name" ref={firstNameRef} />
                    <input type="text" placeholder="Last name" ref={lastNameRef} />
                </div>
                <input type="text" placeholder="Address" ref={addressRef} />
                <div className="flex">
                    <input type="text" placeholder="Postal code" ref={postalCodeRef} />
                    <input type="text" placeholder="City" ref={cityRef} />
                </div>
                <input type="text" placeholder="Phone" ref={phoneRef} />
            </div>

            <div className="section">
                <h2>Payment</h2>

                <input type="text" placeholder="Card number" ref={cardNumberRef}/>
                <div className="flex">
                    <input type="text" placeholder="Expiration date (MM/YY)" ref={expirationDateRef} />
                    <input type="text" placeholder="Security Code" ref={securityCodeRef} />
                </div>
                <input type="text" placeholder="Name on card" ref={nameOnCardRef}/>
            </div>

            <label>
                <input type="checkbox" ref={savePaymentRef}/>
                <span>Save my payment information</span>
            </label>

            <button onClick={handlePay}>Pay now</button>
        </div>
    )
}

export default Checkout