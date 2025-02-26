// Import libraries
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    banners: [],
    loading: false
}

const wishlistSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {
        setBanners: (state, action) => {
            state.banners = action.payload;
        }
    }
})

export const { setBanners } = wishlistSlice.actions;
export default wishlistSlice.reducer;