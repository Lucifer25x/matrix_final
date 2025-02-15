// Import libraries
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";
import useWishlist from "../hooks/useWishlist";
import Product from "../components/SingleProduct";
import supabase from "../utils/supabase";

// Import styles
import "../assets/styles/pages/Wishlist.css";

// FIXME: Fix the product reappearing on the wishlist page after being removed
// Wishlist page
const Wishlist = () => {
    const { user, loading } = useContext(UserContext);
    const { wishlist } = useWishlist();
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user && !loading){
            navigate("/login")
        }

        const fetchProducts = async () => {
            if (wishlist.length > 0) {
                const products_id_list = wishlist.map(item => item.product_id);
                const { data, error } = await supabase
                    .from("vinyls")
                    .select("*")
                    .in("id", products_id_list);

                if (error) {
                    console.error(error);
                } else {
                    setProducts(data);
                }
            } else {
                setProducts([]);
            }
            setProductsLoading(false);
        }
        
        document.title = "Wishlist | The Record Hub"
        fetchProducts();
    }, [user, loading, wishlist])

    if (loading || productsLoading) {
        return <Loading />
    }

    return (
        <div className="wishlist-page">
            <h1>Wishlist</h1>
            <div className="wishlist">
                {products.length > 0 ? (
                    products.map(product => (
                        <Product key={product.id} product={product} />
                    ))
                ) : (
                    <p>Your wishlist is empty!</p>
                )}
            </div>
        </div>
    )
}

export default Wishlist