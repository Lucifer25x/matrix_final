// Import libraries
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { RiHeartLine } from "@remixicon/react";
import { useCart } from "react-use-cart";
import { toast, Bounce } from "react-toastify";
import { LangContext } from "../context/LangContext";
import supabase from "../utils/supabase";
import SingleProduct from "../components/SingleProduct";
import StaticLang from "../utils/StaticLang";
import Loading from "../components/Loading";
import useWishlist from "../hooks/useWishlist";

// Import Swiper React components
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import styles
import "../assets/styles/pages/Product.css";

// Product page
const Product = () => {
    const { id } = useParams()
    const { addItem } = useCart();
    const { addWishlist, removeWishlist, isInWishlist } = useWishlist();
    const [productDetails, setProductDetails] = useState(null)
    const [randomVinyls, setRandomVinyls] = useState([])
    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    const [loading, setLoading] = useState(true);
    const { lang } = useContext(LangContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        const getProduct = async () => {
            const { data, error } = await supabase.from("vinyls").select("*").eq("id", id);
            if (error) {
                console.log(error)
            } else {
                setProductDetails(data[0])
            }
            setLoading(false);
        }

        const getRandomVinyls = async () => {
            const { data, error } = await supabase.rpc('random_vinyls', { limit_count: 6 });
            if (error) {
                console.log(error)
            } else {
                setRandomVinyls(data);
            }
        }

        const getRecentlyViewedProducts = async () => {
            const { data, error } = await supabase.from("vinyls").select("*").in("id", recentlyViewed);
            if (error) {
                console.log(error)
            } else {
                setRecentlyViewedProducts(data);
            }
        }

        // Add product to recently viewed
        if (recentlyViewed.length > 0) {
            if (!recentlyViewed.includes(id)) {
                if (recentlyViewed.length >= 10) {
                    recentlyViewed.shift();
                }

                recentlyViewed.push(id);
            }
        } else {
            recentlyViewed.push(id);
        }
        localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));

        getProduct();
        getRandomVinyls();
        getRecentlyViewedProducts();

        document.title = "Product | The Record Hub";
    }, [id]);

    const handleAddToCart = () => {
        addItem(productDetails);

        toast.success(lang === "az" ? "Məhsul səbətə əlavə edildi!" : "Product was added to your cart!", {
            position: "bottom-right",
            autoClose: 3000,
            closeOnClick: false,
            theme: "colored",
            transition: Bounce,
        });
    }

    const handleWishlist = async () => {
        if (isInWishlist(productDetails.id)) {
            await removeWishlist(productDetails.id);
        } else {
            const res = await addWishlist(productDetails.id);

            if (res) {
                toast.success(lang === "az" ? "Məhsul sevimlilərə əlavə edildi!" : "Product was added to your wishlist!", {
                    position: "bottom-right",
                    autoClose: 3000,
                    closeOnClick: false,
                    theme: "colored",
                    transition: Bounce,
                });
            } else {
                toast.error(lang === "az" ? "Məhsulu sevimlilərə əlavə etmək üçün daxil olun!" : "You need to login to add products to your wishlist!", {
                    position: "bottom-right",
                    autoClose: 3000,
                    closeOnClick: false,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="product-details-page">
            {!productDetails && <div className="not-found"><p><StaticLang en="Product not found" az="Məhsul tapılmadı" /></p></div>}

            {productDetails && (
                <>
                    <div className="general">
                        <div className="img" data-aos="fade-right">
                            <img src={productDetails.img} alt={productDetails.title} />
                        </div>

                        <div className="about" data-aos="fade-left">
                            <div className="top">
                                <h2 className="artist">{productDetails.artist}</h2>
                                <p className="title">{productDetails.title}</p>
                                <p className="label">{productDetails.label}</p>
                            </div>

                            <div className="details">
                                <p><b>Format:</b> {productDetails.format}</p>
                                <p><b><StaticLang en="Color" az="Rəng" />:</b> {productDetails.color}</p>
                                <p><b><StaticLang en="Genre" az="Janr" />:</b> {productDetails.genre}</p>
                                <p><b><StaticLang en="Release Year" az="Buraxılış İli" />:</b> {productDetails.release_year}</p>
                            </div>

                            <div className="bottom">
                                <p className="price"><StaticLang en="Price" az="Qiymət" />: ${productDetails.price}</p>
                                <div className="buttons">
                                    <button onClick={handleAddToCart} disabled={!productDetails.stock}><StaticLang en="ADD TO CART" az="SƏBƏTƏ ƏLAVƏ EDİN" /></button>
                                    <div onClick={handleWishlist} className={`add-wishlist ${isInWishlist(productDetails.id) ? "active" : ""}`} title="Add to wishlist">
                                        <RiHeartLine size={30} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="description" data-aos="fade-up">
                        {productDetails.description}
                    </div>

                    {productDetails.tracks.length > 0 && (
                        <div className="tracklist" data-aos="fade-up">
                            <h2><StaticLang en="Tracklist" az="Trek siyahısı" /></h2>
                            <ul>
                                {productDetails.tracks.map((track, index) => (
                                    <li key={index}>{index + 1}. {track}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}

            <div className="section">
                <h1><StaticLang en="YOU MAY ALSO LIKE" az="SİZ HƏMÇİNİN BƏYƏNƏ BİLƏRSİNİZ" /></h1>
                <div className="products" data-aos="fade-up">
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
                                    <SingleProduct
                                        product={vinyl}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : ""}
                </div>
                <Link to={"/products"}><StaticLang en="SEE ALL" az="HAMISINI GÖRÜN" /></Link>
            </div>

            {recentlyViewedProducts.length > 5 && (
                <div className="section" data-aos="fade-up">
                    <h1><StaticLang en="RECOMMENDED" az="TÖVSİYƏ EDİLƏN" /></h1>
                    <div className="products">
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
                            {recentlyViewedProducts.map(vinyl => (
                                <SwiperSlide key={vinyl.id}>
                                    <SingleProduct
                                        product={vinyl}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product