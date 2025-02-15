// Import libraries
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SingleBlog from "../components/SingleBlog";
import supabase from "../utils/supabase";
import ReactMarkdown from "react-markdown";
import StaticLang from "../utils/StaticLang";
import Loading from "../components/Loading";

// Import styles
import "../assets/styles/pages/Blog.css";

// Blog page
const Blog = () => {
    const { id } = useParams()
    const [blogDetails, setBlogDetails] = useState(null)
    const [latestBlogs, setLatestBlogs] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0);

        const getBlog = async () => {
            const { data, error } = await supabase.from("blogs").select("*").eq("id", id);
            if (error) {
                console.log(error)
            } else {
                setBlogDetails(data[0])
            }
        }

        const getLatestThreeBlogs = async () => {
            const { data, error } = await supabase.from("blogs").select("id, title, img, tags, created_at").order("created_at", { ascending: false }).range(0, 2);
            if (error) {
                console.log(error)
            } else {
                setLatestBlogs(data)
            }
        }

        getBlog();
        getLatestThreeBlogs();

        document.title = "Blog | The Record Hub";
    }, [id]);

    if (!blogDetails) {
        return <Loading />;
    }

    return (
        <div className="blog-page">
            <div className="blog-banner" data-aos="zoom-in">
                <img src={blogDetails.img} alt={blogDetails.title} />
                <h1>{blogDetails.title}</h1>
            </div>
            <div className="blog-bottom" data-aos="zoom-in">
                <div className="route">
                    <p><Link to={"/"}>Home</Link> / <Link to={"/blogs"}>Blogs</Link></p>
                </div>

                <h1>{blogDetails.title}</h1>
                <div className="details">
                    <span className="author">by {blogDetails.author}</span>
                    -
                    <span className="date">{blogDetails.created_at.slice(0, 10)}</span>
                </div>

                <div className="content">
                    <ReactMarkdown>{blogDetails.content}</ReactMarkdown>
                </div>

                <div className="other-blogs" data-aos="fade-up">
                    <h2><StaticLang en="Other Blogs" az="Digər bloglar" /></h2>
                    <div className="blogs">
                        {latestBlogs && latestBlogs.map((blog, index) => (
                            <SingleBlog key={index} blog={blog} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Blog