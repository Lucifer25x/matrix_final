// Import libraries
import { useRef, useEffect } from "react";
import supabase from "../utils/supabase";
import Swal from "sweetalert2";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/pages/Login.css";

// Login page
const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        document.title = "Login | The Record Hub";
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: emailRef.current.value,
            password: passwordRef.current.value
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
                    window.location.href = "/";
                }
            })
        }
    }

    const handleSignUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: emailRef.current.value,
            password: passwordRef.current.value
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
                text: "Account created successfully! Now verfiy your email address.",
                icon: "success"
            })
        }
    }

    return (
        <div className="login-page">
            <h1><StaticLang en="CUSTOMER LOGIN" az="MÜŞTƏRİ GİRİŞİ" /></h1>

            <div className="sections">
                <div className="section">
                    <form onSubmit={handleLogin}>
                        <div className="input">
                            <label htmlFor="email"><StaticLang en="Email address" az="E-poçt ünvanı" />*</label>
                            <input type="email" id="email" placeholder="Enter email" ref={emailRef} required />
                        </div>

                        <div className="input">
                            <label htmlFor="password"><StaticLang en="Password" az="Şifrə" />*</label>
                            <input type="password" id="password" placeholder="Enter password" ref={passwordRef} required />
                        </div>

                        <div className="buttons">
                            <button type="submit"><StaticLang en="LOGIN" az="DAXİL OLUN" /></button>
                            <button type="button" onClick={handleSignUp}><StaticLang en="SIGN UP" az="QEYDİYYATDAN KEÇİN" /></button>
                        </div>
                    </form>
                </div>

                <div className="section">
                    <p>
                        <StaticLang en="If you're an existing customer but you didn't setup an account when you checked out, you can do so here by clicking 'Sign Up'."
                            az="Mövcud müştərisinizsə, lakin qeydiyyatdan keçən zaman hesab quraşdırmamısınızsa, bunu 'Qeydiyyatdan Keçin' üzərinə klikləməklə edə bilərsiniz." />
                    </p>

                    <p>
                        <StaticLang en="When signing up use the same email address as when you made your order and you will then be able to view your full purchase history from within your account."
                            az="Qeydiyyatdan keçərkən sifarişinizi verdiyiniz zamankı kimi eyni e-poçt ünvanından istifadə edin və sonra siz öz hesabınızdan tam alış tarixçənizə baxa biləcəksiniz." />
                    </p>

                    <p>
                        <StaticLang en="If you haven't purchased from us yet but want to save your wishlist, simply 'Sign Up' here also."
                            az="Əgər siz hələ bizdən alış-veriş etməmisinizsə, lakin istək siyahınızı saxlamaq istəyirsinizsə, burada da 'Qeydiyyatdan keçin' kifayətdir." />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login