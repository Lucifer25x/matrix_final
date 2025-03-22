// Import libraries
import { useRef, useEffect, useState } from "react";
import supabase from "../utils/supabase";
import Swal from "sweetalert2";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/pages/Login.css";

// Login page
const Login = () => {
    const nameRef = useRef();
    const surnameRef = useRef();
    const loginEmailRef = useRef();
    const loginPasswordRef = useRef();
    const registerEmailRef = useRef();
    const registerPasswordRef = useRef();
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Login | The Record Hub";
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginEmailRef.current.value,
            password: loginPasswordRef.current.value
        })

        if (error) {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error"
            })
        } else {
            Swal.fire({
                title: "Success!",
                text: "Logged in successfully!",
                icon: "success",
            }).then(res => {
                if (res.isConfirmed) {
                    window.location.href = "/account";
                }
            })
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email: registerEmailRef.current.value,
            password: registerPasswordRef.current.value
        })

        if (error) {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error"
            })
        } else {
            // Add additional data to user_info table
            if (data) {
                const { error } = await supabase.from("user_info").insert([
                    {
                        user_id: data.user.id,
                        name: nameRef.current.value,
                        surname: surnameRef.current.value
                    }
                ])

                if (error) {
                    Swal.fire({
                        title: "Error!",
                        text: error.message,
                        icon: "error"
                    })
                } else {
                    Swal.fire({
                        title: "Success!",
                        text: "Account created successfully! Now verify your email address.",
                        icon: "success"
                    })
                }
            }
        }

        // Clear form fields
        nameRef.current.value = "";
        surnameRef.current.value = "";
        registerEmailRef.current.value = "";
        registerPasswordRef.current.value = "";
    }

    return (
        <div className="login-page" data-aos="fade-up">
            <h1><StaticLang en="CUSTOMER LOGIN" az="MÜŞTƏRİ GİRİŞİ" /></h1>

            <div className="content">
                <div className="tab-names">
                    <div className={!activeTab ? "active" : ""} onClick={() => { setActiveTab(0) }}><StaticLang en="Login" az="Giriş" /></div>
                    <div className={activeTab ? "active" : ""} onClick={() => { setActiveTab(1) }}><StaticLang en="Register" az="Qeydiyyat" /></div>
                </div>

                <div className="tab-content">
                    <div className={!activeTab ? "login active" : "login"}>
                        <form onSubmit={handleLogin}>
                            <label>
                                <span>Email:</span>
                                <input type="email" ref={loginEmailRef} required />
                            </label>
                            <label>
                                <span><StaticLang en="Password:" az="Şifrə:" /></span>
                                <input type="password" ref={loginPasswordRef} required />
                            </label>
                            <button type="submit">Login</button>
                        </form>
                    </div>

                    <div className={activeTab ? "register active" : "register"}>
                        <form onSubmit={handleRegister}>
                            <div className="flex">
                                <label>
                                    <span><StaticLang en="Name:" az="Ad:" /></span>
                                    <input type="text" ref={nameRef} required />
                                </label>
                                <label>
                                    <span><StaticLang en="Surname:" az="Soyad:" /></span>
                                    <input type="text" ref={surnameRef} required />
                                </label>
                            </div>
                            <label>
                                <span>Email:</span>
                                <input type="email" ref={registerEmailRef} required />
                            </label>
                            <label>
                                <span><StaticLang en="Password:" az="Şifrə:" /></span>
                                <input type="password" ref={registerPasswordRef} required />
                            </label>
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login