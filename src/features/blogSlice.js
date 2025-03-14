// Import libraries
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    blogs: [],
    loading: false
}

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        }
    }
})

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;