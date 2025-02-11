// Import libraries
import { useRef } from "react";
import supabase from "../utils/supabase";
import Swal from "sweetalert2";

// Import styles
import "../assets/styles/pages/Login.css";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

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
                if(res.isConfirmed){
                    window.location.href = "/account"
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
                text: "Account created successfully!",
                icon: "success"
            })
        }
    }

    return (
        <div className="login-page">
            <h1>CUSTOMER LOGIN</h1>

            <div className="sections">
                <div className="section">
                    <form onSubmit={handleLogin}>
                        <div className="input">
                            <label htmlFor="email">Email address*</label>
                            <input type="email" id="email" placeholder="Enter email" ref={emailRef} required />
                        </div>

                        <div className="input">
                            <label htmlFor="password">Password*</label>
                            <input type="password" id="password" placeholder="Enter password" ref={passwordRef} required />
                        </div>

                        <div className="buttons">
                            <button type="submit">LOGIN</button>
                            <button type="button" onClick={handleSignUp}>SIGN UP</button>
                        </div>
                    </form>

                    {/* <p>New Customer? <Link to="/register">Sign Up</Link></p> */}
                </div>

                <div className="section">
                    <p>
                        If you're an existing customer but you didn't setup an account when you checked out, you can do so here by clicking "Sign Up".
                    </p>

                    <p>
                        When signing up use the same email address as when you made your order and you will then be able to view your full purchase history from within your account.
                    </p>

                    <p>
                        If you haven't purchased from us yet but want to save your wishlist, simply "Sign Up" here also.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login