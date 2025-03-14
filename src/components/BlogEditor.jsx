// Import libraries
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import Swal from "sweetalert2";
import useBlog from "../hooks/useBlog";

// Import styles
import "../assets/styles/components/BlogEditor.css";

// Blog Editor component
const BlogEditor = () => {
    const { blogs, addBlogData, updateBlogData, removeBlogData } = useBlog();
    const [showPopup, setShowPopup] = useState(false);
    const [mode, setMode] = useState("Add");
    const [id, setId] = useState(null);

    // Refs
    const imgRef = useRef();
    const titleRef = useRef();
    const authorRef = useRef();
    const tagsRef = useRef();
    const contentRef = useRef();
    const highlightRef = useRef();

    // Handle closing popup
    const handleClosePopup = () => {
        setShowPopup(false);

        // Reset form
        const form = document.querySelector("#blog-editor-popup form");
        form.reset();
    }

    // Handle adding new blog
    const handleAddBlog = () => {
        setMode("Add");
        setShowPopup(true);
    }

    // Handle blog edit
    const handleBlogEdit = (blog) => {
        // Fill form with blog data
        imgRef.current.value = blog.img;
        titleRef.current.value = blog.title;
        authorRef.current.value = blog.author;
        tagsRef.current.value = blog.tags.join(", ");
        highlightRef.current.checked = blog.highlight;
        contentRef.current.value = blog.content;

        // Show popup
        setId(blog.id);
        setMode("Save");
        setShowPopup(true);
    }

    // Handle remove blog
    const handleRemoveBlof = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00b41b",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                removeBlogData(id)
                .then(res => {
                    if (res) {
                        // Show success message
                        Swal.fire({
                            icon: "success",
                            title: "Blog was removed successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        // Show error message
                        Swal.fire({
                            icon: "error",
                            title: "An error occurred",
                            text: res.message
                        });
                    }
                })
            }
        });
    }

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Get form data
        const img = imgRef.current.value.trim();
        const title = titleRef.current.value.trim();
        const author = authorRef.current.value.trim();
        const tags = tagsRef.current.value.split(",").map(tag => tag.trim());
        const content = contentRef.current.value;
        const highlight = highlightRef.current.checked;

        // Change the action based on the mode
        if (mode == "Add") {
            // Add blog
            const res = addBlogData({ img, title, author, tags, content, highlight });

            // Show success message
            if (res) {
                Swal.fire({
                    icon: "success",
                    title: "Blog was added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "An error occurred",
                    text: res.message
                });
            }
        } else {
            // Update blog
            const res = updateBlogData(id, { img, title, author, tags, content, highlight });

            // Show success message
            if (res) {
                Swal.fire({
                    icon: "success",
                    title: "Blog was updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "An error occurred",
                    text: res.message
                });
            }
        }

        // Close popup
        handleClosePopup();
    }

    return (
        <div className="blog-editor">
            <div className={`popup ${showPopup ? "show" : ""}`}>
                <div className="content" id="blog-editor-popup">
                    <h3>{mode == "Save" ? "Edit" : "Add"} Blog</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Image URL</span>
                            <input type="text" ref={imgRef} required />
                        </label>
                        <label>
                            <span>Title</span>
                            <input type="text" ref={titleRef} required />
                        </label>
                        <label>
                            <span>Author</span>
                            <input type="text" ref={authorRef} required />
                        </label>
                        <label>
                            <span>Tags</span>
                            <input type="text" ref={tagsRef} required />
                        </label>
                        <label>
                            <span>Content</span>
                            <textarea ref={contentRef} required></textarea>
                        </label>
                        <label className="row">
                            <input type="checkbox" ref={highlightRef} />
                            <span>Highlight</span>
                        </label>
                        <div className="buttons">
                            <button className="cancel" type="button" onClick={handleClosePopup}>Cancel</button>
                            <button type="submit">{mode}</button>
                        </div>
                    </form>
                </div>
            </div>

            {blogs.length == 0 && (
                <div className="loader">
                    <MoonLoader color={"var(--text-color)"} size={75} />
                </div>
            )}

            {blogs.length > 0 && (
                <div className="toolbar">
                    <h3>{blogs.length} blogs</h3>
                    <button onClick={handleAddBlog}>Create a blog</button>
                </div>
            )}

            {[...blogs].sort((a, b) => b.id - a.id).sort((a, b) => b.highlight - a.highlight).map(blog => (
                <div className={`blog ${blog.highlight ? "highlight" : ""}`} key={blog.id}>
                    <div className="details">
                        <Link to={`/blog/${blog.id}`}>
                            {blog.title}
                        </Link>
                        <p>{blog.author}</p>
                    </div>

                    <div className="actions">
                        <button onClick={() => { handleRemoveBlof(blog.id) }}>Remove</button>
                        <button onClick={() => { handleBlogEdit(blog) }}>Edit</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BlogEditor;