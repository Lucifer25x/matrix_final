import '../assets/css/Home.css'
import { Link } from 'react-router-dom'
import { RiArrowRightUpFill } from '@remixicon/react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Home = () => {

    return (
        <div className="home">
            <div className="banner">
                <div className="overlay"></div>
                <div className="content">
                    <h1>Welcome to Kafka</h1>
                    <p>Your one-stop shop for all your needs</p>
                    <Link to="/">Shop Now</Link>
                </div>
            </div>

            <h1>Highlighted Products</h1>
            <div className="highlighted_products">
                <h2 style={{ marginTop: "20px" }}>Book</h2>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                        1300: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                    }}
                >
                    <SwiperSlide>
                        <Link to={`/product/`}>
                            <div className="img">
                                <img src="https://placehold.co/400" alt="Product" />
                                <div className="effect">
                                    <RiArrowRightUpFill size={100} />
                                </div>
                            </div>
                            <h3>Product 1</h3>
                            <p>$100</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={`/product/`}>
                            <div className="img">
                                <img src="https://placehold.co/400" alt="Product" />
                                <div className="effect">
                                    <RiArrowRightUpFill size={100} />
                                </div>
                            </div>
                            <h3>Product 1</h3>
                            <p>$100</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={`/product/`}>
                            <div className="img">
                                <img src="https://placehold.co/400" alt="Product" />
                                <div className="effect">
                                    <RiArrowRightUpFill size={100} />
                                </div>
                            </div>
                            <h3>Product 1</h3>
                            <p>$100</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={`/product/`}>
                            <div className="img">
                                <img src="https://placehold.co/400" alt="Product" />
                                <div className="effect">
                                    <RiArrowRightUpFill size={100} />
                                </div>
                            </div>
                            <h3>Product 1</h3>
                            <p>$100</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={`/product/`}>
                            <div className="img">
                                <img src="https://placehold.co/400" alt="Product" />
                                <div className="effect">
                                    <RiArrowRightUpFill size={100} />
                                </div>
                            </div>
                            <h3>Product 1</h3>
                            <p>$100</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={`/product/`}>
                            <div className="img">
                                <img src="https://placehold.co/400" alt="Product" />
                                <div className="effect">
                                    <RiArrowRightUpFill size={100} />
                                </div>
                            </div>
                            <h3>Product 1</h3>
                            <p>$100</p>
                        </Link>
                    </SwiperSlide>
                </Swiper>

                <h2 style={{ marginTop: "20px" }}>Figurine</h2>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                        1300: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                    }}
                >
                    <SwiperSlide>
                        <Link to={`/product/`}>
                            <div className="img">
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F71M709bxT9L.jpg&f=1&nofb=1&ipt=c396eab94d6f9551f37a832e1b37ae306fa854f8400d301bc1bd3fb8fd6f56f3&ipo=images" alt="Product" />
                                <div className="effect">
                                    <RiArrowRightUpFill size={100} />
                                </div>
                            </div>
                            <h3>Product 1</h3>
                            <p>$100</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={`/product/`}>
                            <div className="img">
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F51JoMLZrb1L.jpg&f=1&nofb=1&ipt=d9f8bc742cebc310e0275eeae74750bcdf4c2986384bd33af5d2e6379517f63b&ipo=images" alt="Product" />
                                <div className="effect">
                                    <RiArrowRightUpFill size={100} />
                                </div>
                            </div>
                            <h3>Product 2</h3>
                            <p>$200</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={`/product/`}>
                            <div className="img">
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstorage.googleapis.com%2Flcdn-products%2F3%2F3%2F5%2F0%2F5%2F7%2F335057-large_default.webp&f=1&nofb=1&ipt=e861f5f01ffa6d38b07d39275e37bac9d9a95494213560997e4e5a86533d6424&ipo=images" alt="Product" />
                                <div className="effect">
                                    <RiArrowRightUpFill size={100} />
                                </div>
                            </div>
                            <h3>Product 3</h3>
                            <p>$300</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={`/product/`}>
                            <div className="img">
                                <img src="https://placehold.co/400" alt="Product" />
                                <div className="effect">
                                    <RiArrowRightUpFill size={100} />
                                </div>
                            </div>
                            <h3>Product 1</h3>
                            <p>$100</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={`/product/`}>
                            <div className="img">
                                <img src="https://placehold.co/400" alt="Product" />
                                <div className="effect">
                                    <RiArrowRightUpFill size={100} />
                                </div>
                            </div>
                            <h3>Product 1</h3>
                            <p>$100</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={`/product/`}>
                            <div className="img">
                                <img src="https://placehold.co/400" alt="Product" />
                                <div className="effect">
                                    <RiArrowRightUpFill size={100} />
                                </div>
                            </div>
                            <h3>Product 1</h3>
                            <p>$100</p>
                        </Link>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default Home