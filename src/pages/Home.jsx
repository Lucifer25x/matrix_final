// Import libraries
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../utils/supabase";

// Import Swiper React components
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import components
import Product from "../components/SingleProduct";

// Import styles
import "../assets/styles/pages/Home.css";

const Home = () => {
    const [banners, setBanners] = useState([]);
    const [vinyls, setVinyls] = useState([]);

    useEffect(() => {
        const getBanners = async () => {
            const { data } = await supabase.from("banners").select("*");
            data.sort((a, b) => a.order - b.order);
            setBanners(data);
        }

        const getVinyls = async () => {
            const { data } = await supabase.from("vinyls").select("*");
            setVinyls(data);
        }

        getBanners();
        getVinyls();
    }, []);

    return (
        <div className="home-page container">
            <div className="banner">
                {banners.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        slidesPerView={1}
                        navigation={true}
                        loop={true}
                        pagination={{ clickable: true }}
                        speed={1000}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                    >
                        {banners.map(banner => (
                            <SwiperSlide key={banner.id}>
                                <Link to={banner.url}>
                                    <img src={banner.image} alt={banner.title} />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : ""}
            </div>

            <div className="section">
                <h1>NEW RELEASES</h1>
                <div className="products">
                    {vinyls.length > 0 ? (
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
                        {vinyls.map(vinyl => (
                            <SwiperSlide key={vinyl.id}>
                                <Product
                                    id={vinyl.id}
                                    img={vinyl.img}
                                    title={vinyl.title}
                                    desc={vinyl.artist}
                                    price={vinyl.price}
                                />
                            </SwiperSlide>    
                        ))}
                    </Swiper>
                    ) : ""}
                </div>
                <button>SEE ALL</button>
            </div>

            <div className="section">
                <h1>PRE-ORDERS</h1>
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
                        <SwiperSlide>
                            <Product
                                img="https://placehold.co/300"
                                title="Product 1"
                                desc="Description 1"
                                price="10.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://placehold.co/300"
                                title="Product 2"
                                desc="Description 2"
                                price="20.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://placehold.co/300"
                                title="Product 3"
                                desc="Description 3"
                                price="30.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://placehold.co/300"
                                title="Product 4"
                                desc="Description 4"
                                price="40.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://placehold.co/300"
                                title="Product 5"
                                desc="Description 5"
                                price="50.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://placehold.co/300"
                                title="Product 6"
                                desc="Description 6"
                                price="60.00"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <button>SEE ALL</button>
            </div>

            <div className="keep-in-touch">
                <h1>KEEP IN TOUCH</h1>
                <div className="inputs">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <button>SIGN UP</button>
                </div>
            </div>

            <div className="bottom-links">
                <div className="redeem">
                    <Link to="/redeem">
                        <img src="https://www.therecordhub.com/cdn/shop/files/Redeem_1600x.png" alt="Redeem" />
                    </Link>
                </div>
                <div className="about">
                    <Link to="/about">
                        <img src="https://www.therecordhub.com/cdn/shop/files/About_us_1600x.png" alt="About" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home