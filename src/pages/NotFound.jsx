// Import libraries
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import supabase from "../utils/supabase";
import SingleProduct from "../components/SingleProduct";
import StaticLang from "../utils/StaticLang";

// Import Swiper React components
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import styles
import "../assets/styles/pages/NotFound.css";

// Not Found page
const NotFound = () => {
    const [highlightedVinyls, setHighlightedVinyls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const getHighlightedVinyls = async () => {
            const { data, error } = await supabase.rpc('highlighted_vinyls');
            if (error) {
                console.log(error)
            } else {
                setHighlightedVinyls(data);
                setLoading(false);
            }
        }

        getHighlightedVinyls();
        document.title = "404 | The Record Hub";
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="not-found-page" data-aos="fade-up">
            <div className="top">
                <h1><StaticLang en="PAGE NOT FOUND" az="SƏHİFƏ TAPILMADI" /></h1>
                <p><StaticLang en="We're sorry, but the page you requested could not be found." az="Üzr istəyirik, lakin sorğu etdiyiniz səhifəni tapmaq mümkün olmadı." /></p>
                <p><StaticLang en="Try searching or continue shopping." az="Axtarmağa cəhd edin və ya alış-verişə davam edin." /></p>
            </div>

            {highlightedVinyls.length > 0 && (
                <div className="section" data-aos="fade-up">
                    <h2><StaticLang en="HIGHLIGHTED" az="NÜMAYİŞ EDİLƏN" /></h2>
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
                            {highlightedVinyls.map(vinyl => (
                                <SwiperSlide key={vinyl.id}>
                                    <SingleProduct
                                        product={vinyl}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <Link to={"/products"}><StaticLang en="SEE ALL" az="HAMISINI GÖRÜN" /></Link>
                </div>
            )}
        </div>
    )
}

export default NotFound