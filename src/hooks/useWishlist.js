// Import libraries
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist, addToWishlist, removeFromWishlist } from "../features/wishlistSlice";
import { UserContext } from "../context/UserContext";
import supabase from "../utils/supabase";

// Custom useWislist hook
const useWishlist = () => {
    const { user, loading } = useContext(UserContext);
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.items);
    const [wishlistLoading, setWishlistLoading] = useState(true);

    // Fetch wishlist items
    useEffect(() => {
        if (!loading && user) {
            const fetchWishlist = async () => {
                const { data, error } = await supabase.from("wishlists").select("product_id").eq("user_id", user.id);

                if (error) console.error(error);
                else dispatch(setWishlist(data))
            }

            fetchWishlist().then(() => setWishlistLoading(false));
        }
    }, [user, loading, dispatch])

    // Check if a product is in wishlist
    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.product_id === productId);
    }

    // Add to wishlist
    const addWishlist = async (productId) => {
        if (!user) return false;

        const { data, error } = await supabase
            .from("wishlists")
            .insert([{ user_id: user.id, product_id: productId }]);

        if (error) console.error(error);
        else {
            dispatch(addToWishlist({ product_id: productId }));
            return true;
        }
    };

    // Remove from wishlist
    const removeWishlist = async (productId) => {
        if (!user) return false;

        const { error } = await supabase
            .from("wishlists")
            .delete()
            .match({ user_id: user.id, product_id: productId });

        if (error) console.error(error);
        else {
            dispatch(removeFromWishlist(productId));
            return true;
        }
    };

    // Wishlist count
    const wishlistCount = wishlist.length;

    return { wishlist, isInWishlist, addWishlist, removeWishlist, wishlistCount, wishlistLoading };
}

export default useWishlist;