// Import libraries
import { useState, useEffect, useContext } from "react";
import { RiArrowRightLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import supabase from "../utils/supabase";
import StaticLang from "../utils/StaticLang";
import { LangContext } from "../context/LangContext";

// Import Swiper React components
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import components
import Product from "../components/SingleProduct";

// Import images
import vinylRecorderImage from "../assets/images/vinyl-record-player.jpg";

// Import styles
import "../assets/styles/pages/Home.css";

// Home page
const Home = () => {
    const [banners, setBanners] = useState([]);
    const [latestVinyls, setLatestVinyls] = useState([]);
    const [newAddedVinyls, setNewAddedVinyls] = useState([]);
    const [highlightedVinyls, setHighlightedVinyls] = useState([]);
    const { lang } = useContext(LangContext);

    useEffect(() => {
        window.scrollTo(0, 0);

        const getBanners = async () => {
            const { data } = await supabase.from("banners").select("*");
            data.sort((a, b) => a.order_num - b.order_num);
            setBanners(data);
        }

        const getLatestVinyls = async () => {
            const { data, error } = await supabase.rpc('latest_vinyls', { limit_count: 10 });
            if (error) {
                console.log(error)
            } else {
                setLatestVinyls(data);
            }
        }

        const getNewAddedVinyls = async () => {
            const { data, error } = await supabase.rpc('new_added_vinyls', { limit_count: 10 });
            if (error) {
                console.log(error)
            } else {
                setNewAddedVinyls(data);
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

        document.title = "Home | The Record Hub";
    }, []);

    if (!banners.length || !latestVinyls.length || !newAddedVinyls.length || !highlightedVinyls.length) {
        return <Loading />;
    }

    return (
        <div className="home-page container">
            <div className="banner" data-aos="zoom-in" data-aos-duration="500">
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

            <div className="section" data-aos="fade-right">
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

            <div className="section" data-aos="fade-right">
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

            <div className="view-blogs" data-aos="fade-up">
                <div className="left">
                    <img src={vinylRecorderImage} alt="Vinyl Recorder" />
                    <div className="layer"></div>
                </div>
                <div className="right">
                    <h1><StaticLang en="CHECK OUT OUR BLOG" az="BLOGUMUZA BAXIN" /></h1>
                    <p><StaticLang en="Check out our blog for the latest news, reviews, and more." az="Ən son xəbərlər, rəylər və daha çox üçün blogumuza baxın." /></p>
                    <Link to="/blogs"><RiArrowRightLine size={25} /><StaticLang en="BLOGS" az="BLOGLAR" /></Link>
                </div>
            </div>

            <div className="section" data-aos="fade-right">
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

            <div className="keep-in-touch" data-aos="fade-up">
                <h1><StaticLang en="KEEP IN TOUCH" az="ƏLAQƏDƏ QALIN" /></h1>
                <div className="inputs">
                    <input type="text" placeholder={lang == "AZ" ? "Ad" : "Name"} />
                    <input type="email" placeholder="Email" />
                    <button><StaticLang en="SIGN UP" az="QEYDİYYATDAN KEÇİN" /></button>
                </div>
            </div>

            <div className="bottom-links" data-aos="fade-up">
                <div className="redeem">
                    <Link to="/cart">
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