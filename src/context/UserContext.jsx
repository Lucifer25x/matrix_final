// Import libraries
import { useState, useEffect, createContext } from "react";
import supabase from "../utils/supabase";

export const UserContext = createContext();

// TODO: Fetch name/surname in context instead of in the component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        }

        checkUser();
    }, []);

    return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>
}