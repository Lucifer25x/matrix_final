// Import libraries
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    products: [],
    loading: false
}

// FIXME: Fix the updateProduct reducer
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateProduct: (state, action) => {
            // const { id, name, price, description, image } = action.payload;
            // const existingProduct = state.products.find(product => product.id == id);
            // if (existingProduct) {
            //     existingProduct.name = name;
            //     existingProduct.price = price;
            //     existingProduct.description = description;
            //     existingProduct.image = image;
            // }
        }
    }
})

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;