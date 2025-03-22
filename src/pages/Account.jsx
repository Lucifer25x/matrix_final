// Import libraries
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";
import supabase from "../utils/supabase";
import SingleProduct from "../components/SingleProduct";
import StaticLang from "../utils/StaticLang";
import Swal from "sweetalert2";

// Import Swiper React components
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import styles
import "../assets/styles/pages/Account.css";

// Account page
const Account = () => {
    const { user, loading } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [pageLoading, setPageLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !loading) {
            navigate("/login")
        }

        const checkAdmin = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from("roles")
                    .select("role")
                    .eq("id", user.id)

                if (error) {
                    console.error("Error fetching roles", error)
                    return
                }

                if (data && data.length > 0) {
                    if (data[0].role === "admin") {
                        setIsAdmin(true)
                    }
                }
            }
        }

        const getUserInfo = async () => {
            const { data, error } = await supabase
                .from("user_info")
                .select("*")
                .eq("user_id", user.id)

            if (error) {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                })
            } else {
                if (data && data.length > 0) {
                    setName(data[0].name);
                    setSurname(data[0].surname);
                    setPageLoading(false);
                }
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

        if (user) {
            getUserInfo();
            checkAdmin();
            if (recentlyViewedProducts.length === 0 && recentlyViewed.length > 0) {
                getRecentlyViewedProducts();
            }
        }

        document.title = "Account | The Record Hub"
    }, [user, loading]);

    const handleSignOut = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be signed out from your account",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, sign out",
            cancelButtonText: "No, cancel",
            confirmButtonColor: "#00b41b",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await supabase.auth.signOut()
                window.location.href = "/login"
            }
        });
    }

    if (loading || pageLoading) {
        return <Loading />
    }

    return (
        <div className="account-page" data-aos="zoom-in">
            <div className="top">
                {user && (
                    <>
                        <h1>Welcome {name} {surname}</h1>
                        <p>Email: {user.email}</p>

                        {!user.user_metadata.email_verified && (
                            <p className="not_verified">Please verify your email address</p>
                        )}

                        <div className="buttons">
                            {isAdmin && (
                                <Link className="admin" to="/dashboard">Dashboard</Link>
                            )}

                            <button onClick={handleSignOut}>SIGN OUT</button>
                        </div>
                    </>
                )}
            </div>

            {recentlyViewedProducts.length > 5 && (
                <div className="section">
                    <h1><StaticLang en="RECENTLY VIEWED" az="SON GÖRÜNƏN" /></h1>
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

export default Account