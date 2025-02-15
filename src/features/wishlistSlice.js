// Import libraries
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    items: [],
    loading: false
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist: (state, action) => {
            state.items = action.payload;
        },
        addToWishlist: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item.product_id !== action.payload);
        }
    }
})

export const { setWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;