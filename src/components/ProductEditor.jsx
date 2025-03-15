// Import libraries
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import Swal from "sweetalert2";
import StaticLang from "../utils/StaticLang";
import useProduct from "../hooks/useProduct";

// Import styles
import "../assets/styles/components/ProductEditor.css";

// Product editor component
const ProductEditor = () => {
    const { products, addProductData, updateProductData, removeProductData } = useProduct();
    const [showPopup, setShowPopup] = useState(false);
    const [mode, setMode] = useState("Add");
    const [id, setId] = useState(null);

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

    // Handle adding new product
    const handleAddProduct = () => {
        setMode("Add");
        setShowPopup(true);
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
        labelRef.current.value = product.label;
        descriptionRef.current.value = product.description;
        trackListRef.current.value = product.tracks.join("\n");
        inStockRef.current.checked = product.stock;
        highlightRef.current.checked = product.highlight;

        // Show popup
        setMode("Save");
        setId(product.id);
        setShowPopup(true);
    }

    // Handle removing product
    const handleRemoveProduct = (id) => {
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
                removeProductData(id)
                    .then(res => {
                        if (res.success) {
                            // Show success message
                            Swal.fire({
                                icon: "success",
                                title: "Product removed successfully",
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get form data
        const img = imgRef.current.value.trim();
        const title = titleRef.current.value.trim();
        const artist = artistRef.current.value.trim();
        const price = priceRef.current.value.trim();
        const releaseYear = releaseYearRef.current.value.trim();
        const genre = genreRef.current.value.trim();
        const format = formatRef.current.value.trim();
        const color = colorRef.current.value.trim();
        const label = labelRef.current.value.trim();
        const description = descriptionRef.current.value;
        const inStock = inStockRef.current.checked;
        const highlight = highlightRef.current.checked;
        const trackList = trackListRef.current.value.split("\n").filter(track => track.trim() !== "");


        // Change the action based on the mode
        if (mode === "Add") {
            // Add product
            const res = await addProductData({
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
            if (res.success) {
                Swal.fire({
                    icon: "success",
                    title: "Product was added successfully",
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
            // Update product
            const res = await updateProductData(id, {
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
            if (res.success) {
                Swal.fire({
                    icon: "success",
                    title: "Product was updated successfully",
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
        <div className="product-editor">
            <div className={`popup ${showPopup ? "show" : ""}`}>
                <div className="content" id="product-editor-popup">
                <h3>{mode == "Save" ? <StaticLang en="Edit Product" az="Məhsulu Redaktə Et" /> : <StaticLang en="Add Product" az="Məhsul Əlavə Et" />}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <label>
                            <span><StaticLang en="Image URL" az="Şəkil URL" /></span>
                                <input type="text" ref={imgRef} required />
                            </label>
                            <label>
                            <span><StaticLang en="Title" az="Başlıq" /></span>
                                <input type="text" ref={titleRef} required />
                            </label>
                        </div>
                        <div className="row">
                            <label>
                            <span><StaticLang en="Artist" az="Musiqiçi" /></span>
                                <input type="text" ref={artistRef} required />
                            </label>
                            <label>
                            <span><StaticLang en="Price" az="Qiymət" /></span>
                                <input type="text" ref={priceRef} required />
                            </label>
                        </div>
                        <div className="row">
                            <label>
                            <span><StaticLang en="Release year" az="Çıxış ili" /></span>
                                <input type="text" ref={releaseYearRef} required />
                            </label>
                            <label>
                            <span><StaticLang en="Genre" az="Janr" /></span>
                                <input type="text" ref={genreRef} required />
                            </label>
                        </div>
                        <div className="row">
                            <label>
                                <span>Format</span>
                                <input type="text" ref={formatRef} required />
                            </label>
                            <label>
                            <span><StaticLang en="Color" az="Rəng" /></span>
                                <input type="text" ref={colorRef} required />
                            </label>
                        </div>
                        <label>
                        <span><StaticLang en="Label" az="Etiket" /></span>
                            <input type="text" ref={labelRef} required />
                        </label>
                        <label>
                        <span><StaticLang en="Description" az="Açıqlama" /></span>
                            <textarea ref={descriptionRef} required></textarea>
                        </label>
                        <label>
                        <span><StaticLang en="Track list" az="Trek listi" /></span>
                            <textarea ref={trackListRef}></textarea>
                        </label>
                        <div className="row">
                            <label className="row-imp">
                                <input type="checkbox" ref={inStockRef} />
                                <span><StaticLang en="In stock" az="Stokda mövcuddur" /></span>
                            </label>
                            <label className="row-imp">
                                <input type="checkbox" ref={highlightRef} />
                                <span><StaticLang en="Highlight" az="Önə çıxar" /></span>
                            </label>
                        </div>
                        <div className="buttons">
                        <button className="cancel" type="button" onClick={handleClosePopup}><StaticLang en="Cancel" az="Ləğv et" /></button>
                        <button type="submit">{mode == "Add" ? <StaticLang en="Add" az="Əlavə et" /> : <StaticLang en="Save" az="Yadda Saxla" />}</button>
                        </div>
                    </form>
                </div>
            </div>

            {products.length == 0 && (
                <div className="loader">
                    <MoonLoader color={"var(--text-color)"} size={75} />
                </div>
            )}

            {products.length > 0 && (
                <div className="toolbar">
                    <h3>{products.length} <StaticLang en="products" az="məhsul" /></h3>
                    <button onClick={handleAddProduct}><StaticLang en="Add Product" az="Məhsul əlavə et" /></button>
                </div>
            )}

            {[...products].sort((a, b) => b.id - a.id).sort((a, b) => b.highlight - a.highlight).map(product => (
                <div className={`product ${product.highlight ? "highlight" : ""}`} key={product.id}>
                    <img width={150} src={product.img} alt={product.title} />
                    <div className="details">
                        <div className="left">
                            <Link to={`/product/${product.id}`}>
                                {product.title}
                            </Link>
                            <p>{product.artist}</p>
                        </div>
                        <div className="right">
                            <button onClick={() => { handleRemoveProduct(product.id) }}><StaticLang en="Remove" az="Sil" /></button>
                            <button onClick={() => { handleProductEdit(product) }}><StaticLang en="Edit" az="Redaktə" /></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductEditor;