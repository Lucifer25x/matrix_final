// Import libraries
import supabase from "../utils/supabase";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";

// Import styles
import "../assets/styles/pages/Account.css";

// TODO: Implement a fully functional account page
// Account page
const Account = () => {
    const { user, loading } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !loading) {
            navigate("/login")
        }

        document.title = "Account | The Record Hub"
    }, [user, loading]);

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        window.location.href = "/login"
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="account-page" data-aos="zoom-in">
            {user && (
                <>
                    <h1>Welcome {user.email.split('@')[0]}</h1>
                    <p>Email: {user.email}</p>

                    {!user.user_metadata.email_verified && (
                        <p className="not_verified">Please verify your email address</p>
                    )}
                </>
            )}
            <button onClick={handleSignOut}>SIGN OUT</button>
        </div>
    )
}

export default Account