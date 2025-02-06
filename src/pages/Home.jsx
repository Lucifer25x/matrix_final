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
    const [latestVinyls, setLatestVinyls] = useState([]);
    const [newAddedVinyls, setNewAddedVinyls] = useState([]);

    useEffect(() => {
        const getBanners = async () => {
            const { data } = await supabase.from("banners").select("*");
            data.sort((a, b) => a.order - b.order);
            setBanners(data);
        }

        const getLatestVinyls = async () => {
            const { data, error } = await supabase.rpc('latest_vinyls', { limit_count: 6 });
            if (error) {
                console.log(error)
            } else {
                setLatestVinyls(data);
            }
        }

        const getNewAddedVinyls = async () => {
            const { data, error } = await supabase.rpc('new_added_vinyls', { limit_count: 6 });
            if (error) {
                console.log(error)
            } else {
                setNewAddedVinyls(data);
            }
        }

        getBanners();
        getLatestVinyls();
        getNewAddedVinyls();
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
                    {latestVinyls.length > 0 ? (
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
                            {latestVinyls.map(vinyl => (
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
                <h1>NEW ADDED</h1>
                <div className="products">
                    <div className="products">
                        {newAddedVinyls.length > 0 ? (
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
                                {newAddedVinyls.map(vinyl => (
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