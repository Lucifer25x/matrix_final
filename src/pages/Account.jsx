// Import libraries
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";

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
                    <p>ID: {userDetails.id}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>Email verified: {userDetails.user_metadata.email_verified ? "yes" : "no"}</p>
                    <p>Account created: {userDetails.created_at}</p>
                    <p>Last signed in: {userDetails.last_sign_in_at}</p>
                </>
            )}
            <button onClick={handleSignOut}>SIGN OUT</button>
        </div>
    )
}

export default Account