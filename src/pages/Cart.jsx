// Import libraries
import { useEffect, useContext, useState } from "react";
import { RiCloseLine, RiLockLine } from "@remixicon/react";
import { UserContext } from "../context/UserContext";
import { LangContext } from "../context/LangContext";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import supabase from "../utils/supabase";
import StaticLang from "../utils/StaticLang";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import Product from "../components/SingleProduct";

// Import Swiper React components
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import styles
import "../assets/styles/pages/Cart.css";

// Cart page
const Cart = () => {
    const { items, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();
    const { user } = useContext(UserContext);
    const [randomVinyls, setRandomVinyls] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { lang } = useContext(LangContext);

    useEffect(() => {
        window.scrollTo(0, 0);

        const getRandomVinyls = async () => {
            const { data, error } = await supabase.rpc('random_vinyls', { limit_count: 10 });
            if (error) {
                console.log(error)
            } else {
                setRandomVinyls(data);
            }
            setLoading(false);
        }

        getRandomVinyls();
        document.title = "Cart | The Record Hub";
    }, []);

    const handleClearCart = () => {
        Swal.fire({
            title: lang == "AZ" ? "Əminsinizmi?" : "Are you sure?",
            text: lang == "AZ" ? "Bunu geri ala bilməyəcəksiniz!" : "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00b41b",
            cancelButtonColor: "#d33",
            confirmButtonText: lang == "AZ" ? "Bəli, silin!" : "Yes, delete it!",
            cancelButtonText: lang == "AZ" ? "Ləğv et" : "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                emptyCart();
                Swal.fire({
                    text: lang == "AZ" ? "Səbət təmizləndi!" : "Cart has been cleared!",
                    icon: "success",
                });
            }
        });
    };

    const handleRemoveItem = (id) => {
        Swal.fire({
            title: lang == "AZ" ? "Əminsinizmi?" : "Are you sure?",
            text: lang == "AZ" ? "Bunu geri ala bilməyəcəksiniz!" : "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00b41b",
            cancelButtonColor: "#d33",
            confirmButtonText: lang == "AZ" ? "Bəli, silin!" : "Yes, delete it!",
            cancelButtonText: lang == "AZ" ? "Ləğv et" : "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                removeItem(id);
                Swal.fire({
                    text: lang == "AZ" ? "Məhsul səbətdən silindi!" : "Product has been removed from cart!",
                    icon: "success",
                });
            }
        });
    };

    const handleDecrement = (id) => {
        const item = items.find((item) => item.id === id);
        if (item.quantity === 1) {
            Swal.fire({
                title: lang == "AZ" ? "Əminsinizmi?" : "Are you sure?",
                text: lang == "AZ" ? "Bunu geri ala bilməyəcəksiniz!" : "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#00b41b",
                cancelButtonColor: "#d33",
                confirmButtonText: lang == "AZ" ? "Bəli, silin!" : "Yes, delete it!",
                cancelButtonText: lang == "AZ" ? "Ləğv et" : "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    removeItem(id);
                    Swal.fire({
                        text: lang == "AZ" ? "Məhsul səbətdən silindi!" : "Product has been removed from cart!",
                        icon: "success",
                    });
                }
            });
        } else {
            updateItemQuantity(id, (item.quantity ?? 0) - 1);
        }
    };

    const handleCheckout = () => {
        if (user) {
            navigate("/checkout");
        } else {
            Swal.fire({
                title: lang == "AZ" ? "Giriş etməlisiniz!" : "You need to login first!",
                icon: "error",
            });
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="cart-page" data-aos="zoom-in">
            <h1>
                <StaticLang en="Cart" az="Səbət" />
            </h1>

            <table>
                <thead>
                    <tr>
                        <th>
                            <StaticLang en="PRODUCTS" az="MƏHSULLAR" />
                        </th>
                        <th>
                            <StaticLang en="PRICE" az="QİYMƏT" />
                        </th>
                        <th>
                            <StaticLang en="QUANTITY" az="MİQDAR" />
                        </th>
                        <th>
                            <StaticLang en="TOTAL" az="ÜMUMİ" />
                        </th>
                        <th>
                            <StaticLang en="REMOVE" az="LƏĞV ET" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="product">
                                <img src={item.img} alt={item.title} />
                                <div className="details">
                                    <p className="artist">{item.artist}</p>
                                    <Link
                                        to={`/product/${item.id}`}
                                        className="title"
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                            </td>
                            <td>${item.price}</td>
                            <td>
                                <div className="quantity">
                                    <button
                                        onClick={() => handleDecrement(item.id)}
                                    >
                                        -
                                    </button>
                                    <div className="count">{item.quantity}</div>
                                    <button
                                        onClick={() => {
                                            updateItemQuantity(
                                                item.id,
                                                (item.quantity ?? 0) + 1,
                                            );
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>${item.price * item.quantity}</td>
                            <td className="remove">
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    <RiCloseLine size={30} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="subtotal">
                <p>
                    <StaticLang en="Subtotal" az="ÜMUMİ" />:
                </p>
                <span>${cartTotal}</span>
            </div>

            <div className="checkout">
                <button onClick={handleCheckout} disabled={items.length === 0}>
                    {" "}
                    <RiLockLine size={25} />{" "}
                    <span>
                        <StaticLang en="CHECKOUT" az="SATIN AL" />
                    </span>
                </button>
            </div>

            <div className="clear-cart">
                <button onClick={handleClearCart} disabled={items.length === 0}>
                    <StaticLang
                        en="CLEAR SHOPPING BAG"
                        az="SƏBƏTİ TƏMİZLƏYİN"
                    />
                </button>
            </div>

            <div className="section" data-aos="fade-right">
                <h1><StaticLang en="RECOMMENDED VINYLS" az="TƏKLİF EDİLƏN VİNİLLƏR" /></h1>
                <div className="products">
                    {randomVinyls.length > 0 ? (
                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={1}
                            navigation={true}
                            loop={true}
                            spaceBetween={20}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 5,
                                }
                            }}
                        >
                            {randomVinyls.map(vinyl => (
                                <SwiperSlide key={vinyl.id}>
                                    <Product
                                        product={vinyl}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : ""}
                </div>
                <Link to={"/products"}><StaticLang en="SEE ALL" az="HAMISINI GÖRÜN" /></Link>
            </div>
        </div>
    );
};

export default Cart;
