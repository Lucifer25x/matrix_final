// Import libraries
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import supabase from "../utils/supabase";
import StaticLang from "../utils/StaticLang";

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

// Home page
const Home = () => {
    const [loading, setLoading] = useState(true);
    const [banners, setBanners] = useState([]);
    const [latestVinyls, setLatestVinyls] = useState([]);
    const [newAddedVinyls, setNewAddedVinyls] = useState([]);
    const [highlightedVinyls, setHighlightedVinyls] = useState([]);

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
                console.log(data[0])
            }
        }

        const getHighlightedVinyls = async () => {
            const { data, error } = await supabase.rpc('highlighted_vinyls');
            if (error) {
                console.log(error)
            } else {
                setHighlightedVinyls(data);
            }
        }

        getBanners();
        getLatestVinyls();
        getNewAddedVinyls();
        getHighlightedVinyls();

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
                <MoonLoader color={"var(--text-color)"} size={75} />
            </div>
        )
    }

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
                <h1><StaticLang en="HIGHLIGHTED VINYLS" az="SEÇİLMİŞ VİNİLLƏR" /></h1>
                <div className="products">
                    {highlightedVinyls.length > 0 ? (
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
                            {highlightedVinyls.map(vinyl => (
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

            <div className="section">
                <h1><StaticLang en="NEW RELEASES" az="YENİ ÇIXANLAR" /></h1>
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
                                        product={vinyl}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : ""}
                </div>
                <Link to={"/products"}><StaticLang en="SEE ALL" az="HAMISINI GÖRÜN" /></Link>
            </div>

            <div className="section">
                <h1><StaticLang en="NEW ADDED" az="YENİ ƏLAVƏ OLANLAR" /></h1>
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
                                        product={vinyl}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : ""}
                </div>
                <Link to={"/products"}><StaticLang en="SEE ALL" az="HAMISINI GÖRÜN" /></Link>
            </div>

            <div className="keep-in-touch">
                <h1><StaticLang en="KEEP IN TOUCH" az="ƏLAQƏDƏ QALIN" /></h1>
                <div className="inputs">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <button><StaticLang en="SIGN UP" az="QEYDİYYATDAN KEÇİN" /></button>
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