// Import libraries
import { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";
import supabase from "../utils/supabase";
import SingleProduct from "../components/SingleProduct";
import StaticLang from "../utils/StaticLang";
import Swal from "sweetalert2";
import { LangContext } from "../context/LangContext";

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
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
    const recentlyViewed =
        JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    const [highlightedVinyls, setHighlightedVinyls] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const { lang } = useContext(LangContext);

    // Refs
    const nameInputRef = useRef();
    const surnameInputRef = useRef();

    useEffect(() => {
        if (!user && !loading) {
            navigate("/login");
        }

        window.scrollTo(0, 0);

        const checkAdmin = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from("roles")
                    .select("role")
                    .eq("id", user.id);

                if (error) {
                    console.error("Error fetching roles", error);
                    return;
                }

                if (data && data.length > 0) {
                    if (data[0].role === "admin") {
                        setIsAdmin(true);
                    }
                }
            }
        };

        const getUserInfo = async () => {
            const { data, error } = await supabase
                .from("user_info")
                .select("*")
                .eq("user_id", user.id);

            if (error) {
                Swal.fire({
                    title: lang == "AZ" ? "Xəta!" : "Error!",
                    text: error.message,
                    icon: "error",
                });
            } else {
                if (data && data.length > 0) {
                    setName(data[0].name);
                    setSurname(data[0].surname);
                    setPageLoading(false);
                }
            }
        };

        const getRecentlyViewedProducts = async () => {
            const { data, error } = await supabase
                .from("vinyls")
                .select("*")
                .in("id", recentlyViewed);
            if (error) {
                console.log(error);
            } else {
                setRecentlyViewedProducts(data);
            }
        };

        const getHighlightedVinyls = async () => {
            const { data, error } = await supabase.rpc("highlighted_vinyls");
            if (error) {
                console.log(error);
            } else {
                setHighlightedVinyls(data);
            }
        };

        if (user) {
            getUserInfo();
            checkAdmin();
            if (
                recentlyViewedProducts.length === 0 &&
                recentlyViewed.length > 0
            ) {
                getRecentlyViewedProducts();
            }
            if (highlightedVinyls.length === 0) {
                getHighlightedVinyls();
            }
        }

        document.title = "Account | The Record Hub";
    }, [user, loading]);

    const handleSignOut = async () => {
        Swal.fire({
            title: lang == "AZ" ? "Əminsinizmi?" : "Are you sure?",
            text: lang == "AZ" ? "Hesabınızdan çıxış edəcəksiniz" : "You will be signed out from your account",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: lang == "AZ" ? "Bəli, çıxış et" : "Yes, sign out",
            cancelButtonText: lang == "AZ" ? "Xeyr, ləğv et" : "No, cancel",
            confirmButtonColor: "#00b41b",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await supabase.auth.signOut();
                window.location.href = "/login";
            }
        });
    };

    const handleEditAccount = async (e) => {
        e.preventDefault();

        const newName = nameInputRef.current.value;
        const newSurname = surnameInputRef.current.value;

        // Check if name and surname are empty
        if (newName === "" || newSurname === "") {
            Swal.fire({
                title: lang == "AZ" ? "Xəta!" : "Error!",
                text: lang == "AZ" ? "Ad və soyad məcburidir" : "Name and surname are required",
                icon: "error",
            });
            return;
        }

        // Confirm if user wants to save changes
        Swal.fire({
            title: lang == "AZ" ? "Əminsinizmi" : "Are you sure?",
            text: lang == "AZ" ? "Dəyişikliklər hesabınızda saxlanacaq" : "You will save changes to your account",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: lang == "AZ" ? "Bəli, saxlay" : "Yes, save",
            cancelButtonText: lang == "AZ" ? "Xeyr, ləğv et" : "No, cancel",
            confirmButtonColor: "#00b41b",
        }).then(async (result) => {
            if (result.isConfirmed) {
                togglePopup();

                const { data, error } = await supabase
                    .from("user_info")
                    .update({
                        name: newName,
                        surname: newSurname,
                    })
                    .eq("user_id", user.id);

                if (error) {
                    Swal.fire({
                        title: lang == "AZ" ? "Xəta!" : "Error!",
                        text: error.message,
                        icon: "error",
                    });
                } else {
                    Swal.fire({
                        title: lang == "AZ" ? "Uğurlu Əməliyyat!" : "Success!",
                        text: lang == "AZ" ? "Hesabınız uğurla dəyişdirildi!" : "Account updated successfully!",
                        icon: "success",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            window.location.reload();
                        }
                    });
                }
            }
        });
    };

    const togglePopup = () => {
        // Change body overflow
        if (showPopup) {
            document.body.style.overflow = "auto";
        } else {
            document.body.style.overflow = "hidden";

            // Set refs
            nameInputRef.current.value = name;
            surnameInputRef.current.value = surname;
        }

        setShowPopup(!showPopup);
    };

    if (loading || pageLoading) {
        return <Loading />;
    }

    return (
        <div className="account-page">
            <div className={`popup ${showPopup ? "show" : ""}`}>
                <div className="content">
                    <h1>
                        <StaticLang en="Edit Account" az="Hesabı Düzənlə" />
                    </h1>

                    <form onSubmit={handleEditAccount}>
                        <label>
                            <p>
                                <StaticLang en="Name:" az="Ad:" />
                            </p>
                            <input type="text" ref={nameInputRef} />
                        </label>
                        <label>
                            <p>
                                <StaticLang en="Surname:" az="Soyad:" />
                            </p>
                            <input type="text" ref={surnameInputRef} />
                        </label>

                        <div className="buttons">
                            <button type="submit">
                                <StaticLang en="Save" az="Yadda Saxla" />
                            </button>
                            <button
                                type="button"
                                className="cancel"
                                onClick={togglePopup}
                            >
                                <StaticLang en="Cancel" az="Ləğv Et" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="top" data-aos="zoom-in">
                {user && (
                    <>
                        <h1>
                            <StaticLang en="Welcome" az="Xoş Gəldiniz" /> {name}{" "}
                            {surname}
                        </h1>
                        <p>Email: {user.email}</p>

                        {!user.user_metadata.email_verified && (
                            <p className="not_verified">
                                <StaticLang
                                    en="Please verify your email address"
                                    az="Email ünvanınızı təsdiqləyin"
                                />
                            </p>
                        )}

                        <div className="buttons">
                            <button onClick={togglePopup} className="edit">
                                <StaticLang
                                    en="EDIT ACCOUNT"
                                    az="HESABI DÜZƏNLƏ"
                                />
                            </button>
                            {isAdmin && (
                                <Link className="admin" to="/dashboard">
                                    <StaticLang
                                        en="DASHBOARD"
                                        az="İDARƏ PANELİ"
                                    />
                                </Link>
                            )}

                            <button onClick={handleSignOut}>
                                <StaticLang en="SIGN OUT" az="ÇIXIŞ" />
                            </button>
                        </div>
                    </>
                )}
            </div>

            {recentlyViewedProducts.length > 5 && (
                <div className="section" data-aos="fade-up">
                    <h1>
                        <StaticLang en="RECENTLY VIEWED" az="SON GÖRÜNƏN" />
                    </h1>
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
                                },
                            }}
                        >
                            {recentlyViewedProducts.map((vinyl) => (
                                <SwiperSlide key={vinyl.id}>
                                    <SingleProduct product={vinyl} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}

            {highlightedVinyls.length > 0 && (
                <div className="section" data-aos="fade-up">
                    <h1>
                        <StaticLang en="HIGHLIGHTED" az="NÜMAYİŞ EDİLƏN" />
                    </h1>
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
                                },
                            }}
                        >
                            {highlightedVinyls.map((vinyl) => (
                                <SwiperSlide key={vinyl.id}>
                                    <SingleProduct product={vinyl} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <Link to={"/products"}>
                        <StaticLang en="SEE ALL" az="HAMISINI GÖRÜN" />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Account;
