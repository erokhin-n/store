import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        role: '',
    },
    reducers: {
        setRole: (state, action:PayloadAction<any, any>) => {
            state.role = action.payload
        }
    }
})

export default userSlice.reducer

export const {setRole} = userSlice.actions