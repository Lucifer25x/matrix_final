// Import libraries
import { useEffect, useContext, useRef, useState } from "react";
import { useCart } from "react-use-cart";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { LangContext } from "../context/LangContext";
import Swal from "sweetalert2";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/pages/Checkout.css";

// Checkout page
const Checkout = () => {
    const savedInfo = JSON.parse(localStorage.getItem("paymentInfo") || "{}");
    const { emptyCart } = useCart();
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();
    const { lang } = useContext(LangContext);

    // Refs
    const countryRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const addressRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();
    const phoneRef = useRef();
    const nameOnCardRef = useRef();
    const savePaymentRef = useRef();
    const [expiryDate, setExpiryDate] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [securityCode, setSecurityCode] = useState("");

    useEffect(() => {
        if (!user && !loading) {
            navigate("/login")
        }

        // Fill in saved payment information
        nameOnCardRef.current.value = savedInfo.nameOnCard || "";
        setExpiryDate(savedInfo.expiryDate || "");
        setCardNumber(savedInfo.cardNumber || "");
        setSecurityCode(savedInfo.securityCode || "");

        window.scrollTo(0, 0);
        document.title = "Checkout | The Record Hub";
    }, [user, loading]);

    // Handle payment
    const handlePay = () => {
        const country = countryRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const address = addressRef.current.value;
        const postalCode = postalCodeRef.current.value;
        const city = cityRef.current.value;
        const phone = phoneRef.current.value;
        const nameOnCard = nameOnCardRef.current.value;
        const savePayment = savePaymentRef.current.checked;

        if (!country || !firstName || !lastName || !address || !postalCode || !expiryDate.length || !city || !phone || !cardNumber.length || !securityCode.length || !nameOnCard) {
            Swal.fire({
                text: lang == "AZ" ? "Zəhmət olmasa bütün məlumatları doldurun" : "Please fill in all fields",
                icon: "warning"
            });
            return;
        }

        if (savePayment) {
            localStorage.setItem("paymentInfo", JSON.stringify({
                cardNumber,
                expiryDate,
                securityCode,
                nameOnCard
            }));
        }

        Swal.fire({
            text: lang == "AZ" ? "Uğurlu ödəniş!" : "Payment successful!",
            icon: "success"
        }).then(() => {
            emptyCart();
            navigate("/cart");
        });
    }


    // Format the expiry date
    const formatExpiryDate = (value) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
        }
        return cleaned;
    };

    const handleExpiryDateChange = (e) => {
        const { value } = e.target;
        const formattedValue = formatExpiryDate(value);

        const month = formattedValue.split('/')[0];
        if (month.length === 2 && (parseInt(month, 10) < 1 || parseInt(month, 10) > 12)) {
            return;
        }

        setExpiryDate(formattedValue);
    };

    const handleExpiryDateKeyDown = (e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            const cursorPosition = e.target.selectionStart;
            if (cursorPosition === 3) {
                e.preventDefault();
                setExpiryDate((prev) => prev.slice(0, -1));
            }
        }
    };

    // Handle card number
    const formatCardNumber = (value) => {
        const cleaned = value.replace(/\D/g, '');
        const groups = cleaned.match(/.{1,4}/g);
        return groups ? groups.join(' ') : '';
    };

    const handleCardNumberChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        if (rawValue.length <= 16) {
            const formattedValue = formatCardNumber(e.target.value);
            setCardNumber(formattedValue);
        }
    };

    // Handle security code
    const handleSecurityCodeChange = (e) => {
        const cleaned = e.target.value.replace(/\D/g, '');
        if (cleaned.length <= 4) {
            setSecurityCode(cleaned);
        }
    };

    return (
        <div className="checkout-page" data-aos="zoom-in">
            <h1><StaticLang en="checkout" az="Ödəniş" /></h1>

            <div className="section">
                <h2><StaticLang en="Delivery" az="Çatdırılma" /></h2>
                <input type="text" placeholder={lang == "AZ" ? "Ölkə/Region" : "Country/Region"} ref={countryRef} />
                <div className="flex">
                    <input type="text" placeholder={lang == "AZ" ? "Ad" : "First name"} ref={firstNameRef} />
                    <input type="text" placeholder={lang == "AZ" ? "Soyad" : "Last name"} ref={lastNameRef} />
                </div>
                <input type="text" placeholder={lang == "AZ" ? "Ünvan" : "Address"} ref={addressRef} />
                <div className="flex">
                    <input type="text" placeholder={lang == "AZ" ? "Postal kodu" : "Postal code"} ref={postalCodeRef} />
                    <input type="text" placeholder={lang == "AZ" ? "Şəhər" : "City"} ref={cityRef} />
                </div>
                <input type="text" placeholder={lang == "AZ" ? "Telefon" : "Phone"} ref={phoneRef} />
            </div>

            <div className="section">
                <h2><StaticLang en="Payment" az="Ödəniş" /></h2>

                <input type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                />
                <div className="flex">
                    <input type="text"
                        placeholder="12/24"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        onKeyDown={handleExpiryDateKeyDown} />
                    <input type="text"
                        placeholder="123"
                        value={securityCode}
                        onChange={handleSecurityCodeChange}
                    />
                </div>
                <input type="text" placeholder={lang == "AZ" ? "Kartın üzərindəki ad" : "Name on card"} ref={nameOnCardRef} />
            </div>

            <label>
                <input type="checkbox" ref={savePaymentRef} />
                <span><StaticLang en="Save my payment information" az="Ödəniş məlumatımı saxla" /></span>
            </label>

            <button onClick={handlePay}><StaticLang en="Pay now" az="Ödə" /></button>
            <Link to="/cart" className="back-to-cart">
                <StaticLang en="Back to cart" az="Səbətə qayıt" />
            </Link>
        </div>
    )
}

export default Checkout