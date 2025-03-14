// Import libraries
import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "../features/wishlistSlice";
import bannerReducer from "../features/bannerSlice";
import productReducer from "../features/productSlice";
import blogReducer from "../features/blogSlice";

const store = configureStore({
    reducer: {
        wishlist: wishlistReducer,
        banners: bannerReducer,
        products: productReducer,
        blogs: blogReducer
    }
})

export default store;