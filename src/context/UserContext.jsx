// Import libraries
import { useState, useEffect, createContext } from "react";
import supabase from "../utils/supabase";

export const UserContext = createContext();

// User Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data, error } = await supabase
                    .from("user_info")
                    .select("name, surname")
                    .eq("user_id", user.id)
                    .single();

                if (error) {
                    console.error(error.message);
                } else {
                    setUserDetails(data);
                }
            }
        }

        getUser().then(() => {
            setLoading(false);
        });
    }, []);

    return <UserContext.Provider value={{ user, userDetails, loading }}>{children}</UserContext.Provider>
}