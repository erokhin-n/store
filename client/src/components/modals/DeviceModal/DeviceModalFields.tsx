import { FC, useContext, useEffect } from "react"
import { ValidationResult } from "../../../enum/enum"
import { IDeviceModalFields } from "../../../interface/interface"
import { useGetAllBrandsQuery } from "../../../store/apiSlice/brandSlice"
import { useGetAllTypesQuery } from "../../../store/apiSlice/typeSlice"
import ErrorModal from "../../ErrorModal"
import BrandIdSelect from "../../UI/BrandIdSelect"
import Input from "../../UI/DeviceModalInput"
import ImageInput from "../../UI/ImageInput"
import NameInput from "../../UI/NameInput"
import PriceInput from "../../UI/PriceInput"
import TypeIdSelect from "../../UI/TypeIdSelect"
import DeviceInfo from "./DeviceInfo"
import { DeviceModalDispatch, DeviceModalState } from "./DeviceModal"

const DeviceModalFields:FC<IDeviceModalFields> = ({deviceStates, handleClick}) => {

    const state:any = useContext(DeviceModalState)
    const dispatch:any = useContext(DeviceModalDispatch)

    // useEffect(()=> {
    //     let validModal = [deviceStates.typeId.valid, 
    //         deviceStates.brandId.valid, 
    //         deviceStates.name.valid, 
    //         deviceStates.price.valid,
    //         deviceStates.image.valid].findIndex( val => 
    //         val !== ValidationResult.success
    //     )

    //     let validInfo = deviceStates.info.findIndex(i => 
    //         i.titleValid !== ValidationResult.success ||
    //         i.descriptionValid !== ValidationResult.success)

    //     if(validModal !== -1 || validInfo !== -1 || !deviceStates.image) {
    //         deviceStates.setDeviceFormError({...deviceStates.deviceFormError,status:true})
    //     } else {
    //         deviceStates.setDeviceFormError({status:false, message: ''})
    //     }
    // },[ deviceStates.typeId, 
    //     deviceStates.brandId, 
    //     deviceStates.name, 
    //     deviceStates.price, 
    //     deviceStates.image, 
    //     deviceStates.info
    // ])   
    const testClick = (e:any) => {
        const val = [
            state.typeIdValid, 
            state.brandIdValid,
            state.nameValid, 
            state.priceValid, 
           ].findIndex(val => 
                val !== ValidationResult.success
            )
        if(val === -1) {
            console.log('send ' + val)
            console.log(state.typeIdValid, 
                state.brandIdValid,
                state.nameValid, 
                state.priceValid)
        } else {
            console.log('dont send ' + val)
            console.log(state.typeIdValid, 
                state.brandIdValid,
                state.nameValid, 
                state.priceValid)
        }
        
    }

    
    return (
        <div>
            <TypeIdSelect />
            <BrandIdSelect />
            <NameInput />
            <PriceInput />
            <ImageInput/>
            <DeviceInfo />
            <button onClick={e => testClick(e)}>сохранить устройство</button>
            {deviceStates.deviceFormError.message && <ErrorModal error={deviceStates.deviceFormError.message} />}
        </div>
    )
}

export default DeviceModalFields