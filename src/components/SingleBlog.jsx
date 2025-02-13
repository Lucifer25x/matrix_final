// Import libraries
import { Link } from "react-router-dom";

// Import styles
import "../assets/styles/components/SingleBlog.css";

// Single blog component
const SingleBlog = ({ blog }) => {
    return (
        <div className="single-blog" data-aos="fade-up">
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

            <Link className="read-more" to={`/blog/${blog.id}`}>READ MORE</Link>
        </div>
    );
}

export default SingleBlog;