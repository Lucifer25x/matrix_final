// Import libraries
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

// Import styles
import "../assets/styles/pages/Account.css";

// TODO: Implement a fully functional account page
// Account page
const Account = () => {
    const [userDetails, setUserDetails] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Check if the user is logged in
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                navigate("/login")
                return
            }

            setUserDetails(user)
        }

        checkUser()
    }, [])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        navigate("/")
    }

    if(!userDetails){
        return <Loading />
    }

    return (
        <div className="account-page">
            {userDetails && (
                <>
                    <h1>Welcome {userDetails.email.split('@')[0]}</h1>
                    <p>Email: {userDetails.email}</p>

                    {!userDetails.user_metadata.email_verified && (
                        <p className="not_verified">Please verify your email address</p>
                    )}
                </>
            )}
            <button onClick={handleSignOut}>SIGN OUT</button>
        </div>
    )
}

export default Account