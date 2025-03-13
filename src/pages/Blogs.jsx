// Import libraries
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import supabase from "../utils/supabase";
import SingleBlog from "../components/SingleBlog";
import StaticLang from "../utils/StaticLang";
import Loading from "../components/Loading";

// Import styles
import "../assets/styles/pages/Blogs.css";

// Blogs page
const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const getBlogs = async () => {
            const { data, error } = await supabase
                .from("blogs")
                .select("id, title, img, tags, created_at, highlight")
                .order("created_at", { ascending: false })

            if (error) {
                console.log(error);
                return;
            }

            setBlogs(data);
        };

        getBlogs();

        document.title = "Blogs | The Record Hub";
    }, []);

    if (!blogs.length) {
        return <Loading />;
    }

    return (
        <div className="blogs-page">
            <h1><StaticLang en="Blogs" az="Bloglar" /></h1>

            <div className="blogs" data-aos="fade-up">
                {blogs.sort((a, b) => b.highlight - a.highlight).map((blog, index) => (
                    <SingleBlog key={index} blog={blog} />
                ))}
            </div>
        </div>
    )
}

export default Blogs;