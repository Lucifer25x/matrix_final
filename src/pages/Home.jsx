// Import Swiper React components
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import components
import Product from '../components/Product';

// Import styles
import "../assets/styles/pages/Home.css";

// Import images
import banner1 from "../assets/images/banner/banner1.jpg";
import banner2 from "../assets/images/banner/banner2.png";
import banner3 from "../assets/images/banner/banner3.jpg";
import banner4 from "../assets/images/banner/banner4.png";

const Home = () => {
    return (
        <div className="home container">
            <div className="banner">
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
                    <SwiperSlide><img src={banner1} alt="Banner 1" /></SwiperSlide>
                    <SwiperSlide><img src={banner2} alt="Banner 2" /></SwiperSlide>
                    <SwiperSlide><img src={banner3} alt="Banner 3" /></SwiperSlide>
                    <SwiperSlide><img src={banner4} alt="Banner 4" /></SwiperSlide>
                </Swiper>
            </div>

            <div className="section">
                <h1>NEW RELEASES</h1>
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
                                img="https://imageplaceholder.net/300"
                                title="Product 1"
                                desc="Description 1"
                                price="10.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://imageplaceholder.net/300"
                                title="Product 2"
                                desc="Description 2"
                                price="20.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://imageplaceholder.net/300"
                                title="Product 3"
                                desc="Description 3"
                                price="30.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://imageplaceholder.net/300"
                                title="Product 4"
                                desc="Description 4"
                                price="40.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://imageplaceholder.net/300"
                                title="Product 5"
                                desc="Description 5"
                                price="50.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://imageplaceholder.net/300"
                                title="Product 6"
                                desc="Description 6"
                                price="60.00"
                            />
                        </SwiperSlide>
                    </Swiper>
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
                                img="https://imageplaceholder.net/300"
                                title="Product 1"
                                desc="Description 1"
                                price="10.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://imageplaceholder.net/300"
                                title="Product 2"
                                desc="Description 2"
                                price="20.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://imageplaceholder.net/300"
                                title="Product 3"
                                desc="Description 3"
                                price="30.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://imageplaceholder.net/300"
                                title="Product 4"
                                desc="Description 4"
                                price="40.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://imageplaceholder.net/300"
                                title="Product 5"
                                desc="Description 5"
                                price="50.00"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Product
                                img="https://imageplaceholder.net/300"
                                title="Product 6"
                                desc="Description 6"
                                price="60.00"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <button>SEE ALL</button>
            </div>
        </div>
    )
}

export default Home