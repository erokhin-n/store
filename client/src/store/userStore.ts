import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataUserResponse } from "../interface/interface";

const initialState:IDataUserResponse = {
    role: '',
    email: ''
}

export const userStore = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRole: (state, action:PayloadAction<string>) => {
            state.role = action.payload
        },
        setEmailinStore: (state, action:PayloadAction<string>) => {
            state.email = action.payload
        } 
    }
})

export default userStore.reducer

export const {setRole, setEmailinStore} = userStore.actions