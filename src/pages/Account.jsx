// Import libraries
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";
import supabase from "../utils/supabase";

// Import styles
import "../assets/styles/pages/Account.css";

// Account page
const Account = () => {
    const { user, loading } = useContext(UserContext)
    const [isAdmin, setIsAdmin] = useState(false)
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

        checkAdmin()
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

                    {isAdmin && (
                        <Link className="admin" to="/dashboard">Admin Dashboard</Link>
                    )}

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