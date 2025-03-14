// Import libraries
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../features/blogSlice";
import { UserContext } from "../context/UserContext";
import supabase from "../utils/supabase";

// Custom useBlog hook
const useBlog = () => {
    const { user, loading } = useContext(UserContext);
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blogs.blogs);

    // Fetch blogs
    useEffect(() => {
        if (!loading && user) {
            const fetchBlogs = async () => {
                const { data, error } = await supabase
                    .from("blogs")
                    .select("*");

                if (error) console.error(error);
                else dispatch(setBlogs(data));
            }

            fetchBlogs();
        }
    }, [user, loading, dispatch])

    // Add a blog
    const addBlogData = async (data) => {
        const { error } = await supabase
            .from("blogs")
            .insert(data);

        if (error) {
            return { success: false, message: error };
        } else {
            const { data: updatedData, error: fetchError } = await supabase
                .from("blogs")
                .select("*");

            if (fetchError) {
                console.error(fetchError);
            } else {
                dispatch(setBlogs(updatedData));
            }

            return { success: true };
        }
    }

    // Update the blog
    const updateBlogData = async (id, data) => {
        const { error } = await supabase
            .from("blogs")
            .update(data)
            .eq("id", id);

        if (error) {
            return { success: false, message: error };
        } else {
            const { data: updatedData, error: fetchError } = await supabase
                .from("blogs")
                .select("*");

            if (fetchError) {
                console.error(fetchError);
            } else {
                dispatch(setBlogs(updatedData));
            }

            return { success: true };
        }
    }

    // Remove a blog
    const removeBlogData = async (id) => {
        const { error } = await supabase
            .from("blogs")
            .delete()
            .eq("id", id);

        if (error) {
            return { success: false, message: error };
        } else {
            const { data: updatedData, error: fetchError } = await supabase
                .from("blogs")
                .select("*");

            if (fetchError) {
                console.error(fetchError);
            } else {
                dispatch(setBlogs(updatedData));
            }

            return { success: true };
        }
    }

    return { blogs, addBlogData, updateBlogData, removeBlogData };
}

export default useBlog;