// Import libraries
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../features/productSlice";
import { UserContext } from "../context/UserContext";
import supabase from "../utils/supabase";

// Custom useProduct hook
const useProduct = () => {
    const { user, loading } = useContext(UserContext);
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);

    // Fetch products
    useEffect(() => {
        if (!loading && user) {
            const fetchProducts = async () => {
                const { data, error } = await supabase
                    .from("vinyls")
                    .select("*");

                if (error) console.error(error);
                else dispatch(setProducts(data));
            }

            fetchProducts();
        }
    }, [user, loading, dispatch])

    // Add a product
    const addProductData = async (data) => {
        const { error } = await supabase
            .from("vinyls")
            .insert(data);

        if (error) {
            console.error(error);
        } else {
            const { data: updatedData, error: fetchError } = await supabase
                .from("vinyls")
                .select("*");

            if (fetchError) {
                console.error(fetchError);
            } else {
                dispatch(setProducts(updatedData));
            }
        }
    }

    // Update the product
    const updateProductData = async (id, data) => {
        const { error } = await supabase
            .from("vinyls")
            .update(data)
            .eq("id", id);

        if (error) {
            console.error(error);
        } else {
            const { data: updatedData, error: fetchError } = await supabase
                .from("vinyls")
                .select("*");

            if (fetchError) {
                console.error(fetchError);
            } else {
                dispatch(setProducts(updatedData));
            }
        }
    }

    // Remove a product
    const removeProductData = async (id) => {
        const { error } = await supabase
            .from("vinyls")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error);
        } else {
            const { data: updatedData, error: fetchError } = await supabase
                .from("vinyls")
                .select("*");

            if (fetchError) {
                console.error(fetchError);
            } else {
                dispatch(setProducts(updatedData));
            }
        }
    }

    return { products, addProductData, updateProductData, removeProductData };
}

export default useProduct;