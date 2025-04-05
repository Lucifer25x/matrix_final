// Import libraries
import { Link } from "react-router-dom";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/components/SingleBlog.css";

// Single blog component
const SingleBlog = ({ blog }) => {
    return (
        <div className={`single-blog ${blog.highlight ? "highlight" : ""}`}>
            <div className="section">
                <div className="img">
                    <img src={blog.img} alt={blog.title} />
                </div>
                <div className="details">
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                    <div className="tags">
                        {blog.tags.map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))}
                    </div>
                    <p className="date">{blog.created_at.slice(0, 10)}</p>
                </div>
            </div>

            <Link className="read-more" to={`/blog/${blog.id}`}><StaticLang en="READ MORE" az="DAHA ÇOX OXUYUN" /></Link>
        </div>
    );
}

export default SingleBlog;