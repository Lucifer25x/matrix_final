// Import libraries
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiHeartLine } from "@remixicon/react";
import { useCart } from "react-use-cart";
import { toast, Bounce } from "react-toastify";
import supabase from "../utils/supabase";
import SingleProduct from "../components/SingleProduct";
import StaticLang from "../utils/StaticLang";
import Loading from "../components/Loading";

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
    const [productDetails, setProductDetails] = useState(null)
    const [randomVinyls, setRandomVinyls] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const getProduct = async () => {
            const { data, error } = await supabase.from("vinyls").select("*").eq("id", id);
            if (error) {
                console.log(error)
            } else {
                setProductDetails(data[0])
            }
        }

        const getRandomVinyls = async () => {
            const { data, error } = await supabase.rpc('random_vinyls', { limit_count: 6 });
            if (error) {
                console.log(error)
            } else {
                setRandomVinyls(data);
            }
        }

        getProduct();
        getRandomVinyls();

        document.title = "Product | The Record Hub";
    }, []);

    const handleAddToCart = () => {
        addItem(productDetails);

        toast.success("Product was added to your cart!", {
            position: "bottom-right",
            autoClose: 3000,
            closeOnClick: false,
            theme: "colored",
            transition: Bounce,
        });
    }

    if (!productDetails || !randomVinyls.length) {
        return <Loading />;
    }

    return (
        <div className="product-details-page">
            <div className="general">
                <div className="img">
                    <img src={productDetails.img} alt={productDetails.title} />
                </div>

                <div className="about">
                    <h2 className="artist">{productDetails.artist}</h2>
                    <p className="title">{productDetails.title}</p>
                    <p className="label">{productDetails.label}</p>
                    <p className="price">${productDetails.price}</p>

                    <div className="buttons">
                        <button onClick={handleAddToCart} disabled={!productDetails.stock}><StaticLang en="ADD TO CART" az="SƏBƏTƏ ƏLAVƏ EDİN" /></button>
                        <div className="add-wishlist" title="Add to wishlist">
                            <RiHeartLine size={30} />
                        </div>
                    </div>

                    <div className="details">
                        <p><b>Format:</b> {productDetails.format}</p>
                        <p><b><StaticLang en="Color" az="Rəng" />:</b> {productDetails.color}</p>
                        <p><b><StaticLang en="Genre" az="Janr" />:</b> {productDetails.genre}</p>
                        <p><b><StaticLang en="Release Year" az="Buraxılış İli" />:</b> {productDetails.release_year}</p>
                    </div>
                </div>
            </div>

            <div className="description">
                {productDetails.description}
            </div>

            {productDetails.tracks.length > 0 && (
                <div className="tracklist">
                    <h2><StaticLang en="Tracklist" az="Trek siyahısı" /></h2>
                    <ul>
                        {productDetails.tracks.map((track, index) => (
                            <li key={index}>{index + 1}. {track}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="section">
                <h1><StaticLang en="YOU MAY ALSO LIKE" az="SİZ HƏMÇİNİN BƏYƏNƏ BİLƏRSİNİZ" /></h1>
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
        </div>
    )
}

export default Product