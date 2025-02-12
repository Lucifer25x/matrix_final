// Import libraries
import supabase from "../utils/supabase";
import { useEffect } from "react";

// Wishlist page
const Wishlist = () => {
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                window.location.href = "/login"
            }

            // setUserDetails(user)
            console.log(user);
        }

        checkUser()
    }, [])

    return (
        <div className="wishlist-page">
            <h1>Wishlist</h1>
            <p>Coming soon...</p>
        </div>
    )
}

export default Wishlist