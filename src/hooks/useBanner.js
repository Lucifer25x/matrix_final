// Import libraries
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBanners } from "../features/bannerSlice";
import { UserContext } from "../context/UserContext";
import supabase from "../utils/supabase";

// Custom useBanner hook
const useBanner = () => {
    const { user, loading } = useContext(UserContext);
    const dispatch = useDispatch();
    const banners = useSelector(state => state.banners.banners);

    // Fetch banners
    useEffect(() => {
        if (!loading && user) {
            const fetchBanners = async () => {
                const { data, error } = await supabase
                    .from("banners")
                    .select("*")
                    .order("order_num");

                if (error) console.error(error);
                else dispatch(setBanners(data));
            }

            fetchBanners();
        }
    }, [user, loading, dispatch])

    // Update the banner
    const updateBannerData = async (id, data) => {
        const { error } = await supabase
            .from("banners")
            .update(data)
            .eq("id", id);

        if (error) {
            console.error(error);
        } else {
            const { data: updatedData, error: fetchError } = await supabase
                .from("banners")
                .select("*")
                .order("order_num");

            if (fetchError) {
                console.error(fetchError);
            } else {
                dispatch(setBanners(updatedData));
            }
        }
    }

    return { banners, updateBannerData };
}

export default useBanner;