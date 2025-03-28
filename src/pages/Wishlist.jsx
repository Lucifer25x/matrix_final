// Import libraries
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";
import useWishlist from "../hooks/useWishlist";
import Product from "../components/SingleProduct";
import supabase from "../utils/supabase";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/pages/Wishlist.css";

// Wishlist page
const Wishlist = () => {
    const { user, loading } = useContext(UserContext);
    const { wishlist, wishlistLoading } = useWishlist();
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !loading) {
            navigate("/login");
        }

        const fetchProducts = async () => {
            if (wishlist.length > 0) {
                const products_id_list = wishlist.map(
                    (item) => item.product_id,
                );
                const { data, error } = await supabase
                    .from("vinyls")
                    .select("id, title, img, artist, price, stock")
                    .in("id", products_id_list);

                if (error) {
                    console.error(error);
                } else {
                    setProducts(data);
                }
            } else {
                setProducts([]);
            }
        };

        if (!wishlistLoading) {
            fetchProducts().then(() => setProductsLoading(false));
        }

        document.title = "Wishlist | The Record Hub";
    }, [user, loading, wishlistLoading]);

    if (loading || productsLoading) {
        return <Loading />;
    }

    return (
        <div className="wishlist-page">
            <h1>
                <StaticLang en="Wishlist" az="İstək siyahısı" />
            </h1>
            <div className="wishlist" data-aos="fade-up">
                {products.length > 0 && wishlist.length > 0 ? (
                    products.map((product) => (
                        <Product
                            key={product.id}
                            product={product}
                            animate={true}
                        />
                    ))
                ) : (
                    <StaticLang
                        en="Your wishlist is empty!"
                        az="İstək siyahınız boşdur!"
                    />
                )}
            </div>
        </div>
    );
};

export default Wishlist;
