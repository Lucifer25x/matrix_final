// Import libraries
import { useState, useRef } from "react";
import { MoonLoader } from "react-spinners";
import Swal from "sweetalert2";
import useProduct from "../hooks/useProduct";

// Import styles
import "../assets/styles/components/ProductEditor.css";

// TODO: Implement product editor component
const ProductEditor = () => {
    const { products, addProductData, updateProductData } = useProduct();
    const [showPopup, setShowPopup] = useState(false);
    const [mode, setMode] = useState("Add");

    // Refs
    const imgRef = useRef();
    const titleRef = useRef();
    const artistRef = useRef();
    const priceRef = useRef();
    const releaseYearRef = useRef();
    const genreRef = useRef();
    const formatRef = useRef();
    const colorRef = useRef();
    const labelRef = useRef();
    const descriptionRef = useRef();
    const trackListRef = useRef();
    const inStockRef = useRef();
    const highlightRef = useRef();

    // Handle closing popup
    const handleClosePopup = () => {
        setShowPopup(false);
        
        // Reset form
        const form = document.querySelector("#product-editor-popup form");
        form.reset();
    }
    
    // Handle editing product
    const handleProductEdit = (product) => {
        // Fill form with product data
        imgRef.current.value = product.img;
        titleRef.current.value = product.title;
        artistRef.current.value = product.artist;
        priceRef.current.value = product.price;
        releaseYearRef.current.value = product.release_year;
        genreRef.current.value = product.genre;
        formatRef.current.value = product.format;
        colorRef.current.value = product.color;
        descriptionRef.current.value = product.description;
        trackListRef.current.value = product.tracks.join("\n");
        inStockRef.current.checked = product.stock;
        highlightRef.current.checked = product.highlight;

        // Show popup
        setMode("Save");
        setShowPopup(true);
    }

    // Handle adding new product
    const handleAddProduct = () => {
        setMode("Add");
        setShowPopup(true);
    }

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Get form data
        const img = imgRef.current.value;
        const title = titleRef.current.value;
        const artist = artistRef.current.value;
        const price = priceRef.current.value;
        const releaseYear = releaseYearRef.current.value;
        const genre = genreRef.current.value;
        const format = formatRef.current.value;
        const color = colorRef.current.value;
        const label = labelRef.current.value;
        const description = descriptionRef.current.value;
        const trackList = trackListRef.current.value.split("\n");
        const inStock = inStockRef.current.checked;
        const highlight = highlightRef.current.checked;

        // Reset form
        const form = document.querySelector("#product-editor-popup form");
        form.reset();

        // Change the action based on the mode
        if (mode === "Add") {
            // Add product
            addProductData({
                img,
                title,
                artist,
                price,
                release_year: releaseYear,
                genre,
                format,
                color,
                label,
                description,
                tracks: trackList,
                stock: inStock,
                highlight
            });

            // Show success message
            Swal.fire({
                icon: "success",
                title: "Product added successfully",
                showConfirmButton: false,
                timer: 1500
            });

            // Close popup
            setShowPopup(false);
        } else {
            // TODO: Implement update product
            console.log("Edit product");
        }
    }

    return (
        <div className="product-editor">
            <div className={`popup ${showPopup ? "show" : ""}`}>
                <div className="content" id="product-editor-popup">
                    <h3>Edit Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <label>
                                <span>Image URL</span>
                                <input type="text" ref={imgRef} />
                            </label>
                            <label>
                                <span>Title</span>
                                <input type="text" ref={titleRef} />
                            </label>
                        </div>
                        <div className="row">
                            <label>
                                <span>Artist</span>
                                <input type="text" ref={artistRef} />
                            </label>
                            <label>
                                <span>Price</span>
                                <input type="text" ref={priceRef} />
                            </label>
                        </div>
                        <div className="row">
                            <label>
                                <span>Release year</span>
                                <input type="text" ref={releaseYearRef} />
                            </label>
                            <label>
                                <span>Genre</span>
                                <input type="text" ref={genreRef} />
                            </label>
                        </div>
                        <div className="row">
                            <label>
                                <span>Format</span>
                                <input type="text" ref={formatRef} />
                            </label>
                            <label>
                                <span>Color</span>
                                <input type="text" ref={colorRef} />
                            </label>
                        </div>
                        <label>
                            <span>Label</span>
                            <input type="text" ref={labelRef} />
                        </label>
                        <label>
                            <span>Description</span>
                            <textarea ref={descriptionRef}></textarea>
                        </label>
                        <label>
                            <span>Track List</span>
                            <textarea ref={trackListRef}></textarea>
                        </label>
                        <div className="row">
                            <label className="row-imp">
                                <input type="checkbox" ref={inStockRef} />
                                <span>In stock</span>
                            </label>
                            <label className="row-imp">
                                <input type="checkbox" ref={highlightRef} />
                                <span>Highlight</span>
                            </label>
                        </div>
                        <div className="buttons">
                            <button className="cancel" type="button" onClick={handleClosePopup}>Cancel</button>
                            <button type="submit">{mode}</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="toolbar">
                <h3>{products.length} products</h3>
                <button onClick={handleAddProduct}>Add Product</button>
            </div>

            {products.length == 0 && (
                <div className="loader">
                    <MoonLoader color={"var(--text-color)"} size={75} />
                </div>
            )}

            {products.map(product => (
                <div className={`product ${product.highlight ? "highlight" : ""}`} key={product.id}>
                    <img width={150} src={product.img} alt={product.title} />
                    <div className="details">
                        <div className="left">
                            <h4>{product.title}</h4>
                            <p>{product.artist}</p>
                        </div>
                        <button onClick={() => { handleProductEdit(product) }}>Edit</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductEditor;