import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDeviceStoreInitialState, ITypeAndBrand } from "../../interface/interface";

const initialState:IDeviceStoreInitialState = {
    brands: [],
    types: [],
    devices: []
}

export const deviceStore = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setTypes: (state, action:PayloadAction<ITypeAndBrand[]>) => {
            state.types = action.payload
        },
        // setEmailinStore: (state, action:PayloadAction<string>) => {
        //     state.email = action.payload
        // }, 
        // removeRoleAndEmail: (state) => {
        //     state.role = ''
        //     state.email = ''
        // }
    }
})

export default deviceStore.reducer

export const {setTypes} = deviceStore.actions