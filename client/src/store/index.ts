import { configureStore } from "@reduxjs/toolkit";
import { indexSlice } from "./apiSlice/indexSlice";
import userReducer from "./store/userStore"
import deviceReducer from "./store/deviceStore"


export const store = configureStore({
    reducer: {
        user: userReducer,
        device: deviceReducer,
        [indexSlice.reducerPath]: indexSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(indexSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
