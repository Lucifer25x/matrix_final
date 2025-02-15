// Import libraries
import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "../features/wishlistSlice";

const store = configureStore({
    reducer: {
        wishlist: wishlistReducer
    }
})

export default store;