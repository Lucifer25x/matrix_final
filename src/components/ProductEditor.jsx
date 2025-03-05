// Import libraries
import { MoonLoader } from "react-spinners";
import Swal from "sweetalert2";
import useProduct from "../hooks/useProduct";

// Import styles
import "../assets/styles/components/ProductEditor.css";

// TODO: Implement product editor component
// TODO: Utilize useProduct hook
const ProductEditor = () => {
    const { products } = useProduct();

    const handleProductEdit = (product) => {
        console.log(product)
    }

    return (
        <div className="product-editor">
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
                <div className="product" key={product.id}>
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