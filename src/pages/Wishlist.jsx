// Import libraries
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";
// import supabase from "../utils/supabase";

// TODO: Implement a fully functional wishlist page
// Wishlist page
const Wishlist = () => {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user && !loading){
            navigate("/login")
        }
        
        document.title = "Wishlist | The Record Hub"
    }, [user, loading])

    if (loading) {
        return <Loading />
    }

    return (
        <div className="wishlist-page">
            <h1>Wishlist</h1>
            <p>Coming soon...</p>
        </div>
    )
}

export default Wishlist