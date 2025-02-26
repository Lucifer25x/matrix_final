// Import libraries
import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "../features/wishlistSlice";
import bannerReducer from "../features/bannerSlice";

const store = configureStore({
    reducer: {
        wishlist: wishlistReducer,
        banners: bannerReducer
    }
})

export default store;