import { MouseEvent, createContext, useReducer, Dispatch } from "react"
import {  IDeviceModalState, IDeviceReducerActions } from "../../../interface/interface"
import { useCreateDeviceMutation } from "../../../store/apiSlice/deviceSlice";
import DeviceModalFields from "./DeviceModalFields";
import { deviceModalReducer, initialState } from "../../../store/reactReducer/deviceModalReducer";

export const DeviceModalDispatch = createContext<Dispatch<IDeviceReducerActions> | null>(null)
export const DeviceModalState= createContext<IDeviceModalState | null>(null)

const DeviceModal = () => {

    const [state, dispatch] = useReducer(deviceModalReducer, initialState)

    const [createDevice, { isLoading}] = useCreateDeviceMutation()

    const sendDeviceForm = () => {
        const formData = new FormData()
        formData.append('typeId', String(state.typeId.value))
        formData.append('brandId', String(state.brandId.value))
        formData.append('name', state.name.value)
        formData.append('price', state.price.value)
        formData.append('img', state.image.value)
        formData.append('info', JSON.stringify(state.info))
        createDevice(formData)
    }

    if(isLoading) return <h3>saved...</h3>

    return (
        <DeviceModalState.Provider value={state}>
            <DeviceModalDispatch.Provider value={dispatch}>
                <DeviceModalFields sendDeviceForm={sendDeviceForm} />
            </DeviceModalDispatch.Provider>
        </DeviceModalState.Provider>
    )
}

export default DeviceModal