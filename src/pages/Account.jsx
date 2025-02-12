// Import libraries
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";

// Import styles
import "../assets/styles/pages/Account.css";

// TODO: Implement a fully functional account page
// Account page
const Account = () => {
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        // Check if the user is logged in
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                window.location.href = "/login"
            }

            setUserDetails(user)
        }

        checkUser()
    }, [])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        window.location.href = "/"
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