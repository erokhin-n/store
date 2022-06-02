import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import userReducer from "./userSlice"


export default configureStore({
    reducer: {
        user: userReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});
