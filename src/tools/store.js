// Import libraries
import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "../features/wishlistSlice";
import bannerReducer from "../features/bannerSlice";
import productReducer from "../features/productSlice";

const store = configureStore({
    reducer: {
        wishlist: wishlistReducer,
        banners: bannerReducer,
        products: productReducer
    }
})

export default store;