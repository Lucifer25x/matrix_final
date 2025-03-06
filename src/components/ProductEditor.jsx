// Import libraries
import { useState } from "react";
import { MoonLoader } from "react-spinners";
import useProduct from "../hooks/useProduct";

// Import styles
import "../assets/styles/components/ProductEditor.css";

// TODO: Implement product editor component
// TODO: Utilize useProduct hook
const ProductEditor = () => {
    const { products } = useProduct();
    const [showPopup, setShowPopup] = useState(false);

    const handleProductEdit = (product) => {
        setShowPopup(true);
        console.log(product)
    }

    const handleClosePopup = () => {
        setShowPopup(false);

        // Reset form
        const form = document.querySelector("#product-editor-popup form");
        form.reset();
    }

    return (
        <div className="product-editor">
            {/* TODO: Make the popup take all the window space, so it fits */}
            <div className={`popup ${showPopup ? "show" : ""}`}>
                <div className="modal" id="product-editor-popup">
                    <h3>Edit Product</h3>
                    <form>
                        <label>
                            <span>Image URL</span>
                            <input type="text" />
                        </label>
                        <label>
                            <span>Title</span>
                            <input type="text" />
                        </label>
                        <label>
                            <span>Artist</span>
                            <input type="text" />
                        </label>
                        <label>
                            <span>Price</span>
                            <input type="text" />
                        </label>
                        <label>
                            <span>Release year</span>
                            <input type="text" />
                        </label>
                        <label>
                            <span>Genre</span>
                            <input type="text" />
                        </label>
                        <label>
                            <span>Format</span>
                            <input type="text" />
                        </label>
                        <label>
                            <span>Color</span>
                            <input type="text" />
                        </label>
                        <label className="row">
                            <input type="checkbox" />
                            <span>In stock</span>
                        </label>
                        <label className="row">
                            <input type="checkbox" />
                            <span>Highlight</span>
                        </label>
                        <label>
                            <span>Description</span>
                            <textarea></textarea>
                        </label>
                        {/* TODO: Create a todo like interface for adding tracks */}
                        <label>
                            <span>Track List</span>
                            <textarea></textarea>
                        </label>
                        <div className="buttons">
                            <button className="cancel" type="button" onClick={handleClosePopup}>Cancel</button>
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="toolbar">
                <h3>{products.length} products</h3>
                <button>Add Product</button>
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