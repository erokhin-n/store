import { configureStore } from "@reduxjs/toolkit";
import { indexSlice } from "./apiSlice/indexSlice";



export const store = configureStore({
    reducer: {
        [indexSlice.reducerPath]: indexSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(indexSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
