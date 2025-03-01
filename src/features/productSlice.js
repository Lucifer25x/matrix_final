// Import libraries
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    products: [],
    loading: false
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    }
})

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;