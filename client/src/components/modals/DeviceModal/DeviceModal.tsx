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

    const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()



        // if(!deviceFormError.status) {
        //     setDeviceFormError({...deviceFormError, message:""})
        //     const formData = new FormData()
        //     formData.append('typeId', String(typeId.id))
        //     formData.append('brandId', String(brandId.id))
        //     formData.append('name', name.value)
        //     formData.append('price', price.value)
        //     formData.append('img', image.file)
        //     formData.append('info', JSON.stringify(info))
        //     createDevice(formData)
        // } else {
        //     setDeviceFormError({...deviceFormError, message:"исправьте форму"})
        // }
    }

    if(isLoading) return <h3>saved...</h3>

    return (
        <DeviceModalState.Provider value={state}>
            <DeviceModalDispatch.Provider value={dispatch}>
                <DeviceModalFields />
            </DeviceModalDispatch.Provider>
        </DeviceModalState.Provider>
    )
}

export default DeviceModal