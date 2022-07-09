import { FC, useEffect } from "react"
import { ValidationResult } from "../../../enum/enum"
import { IDeviceModalFields } from "../../../interface/interface"
import { useGetAllBrandsQuery } from "../../../store/apiSlice/brandSlice"
import { useGetAllTypesQuery } from "../../../store/apiSlice/typeSlice"
import ErrorModal from "../../ErrorModal"
import Input from "../../UI/DeviceModalInput"
import ImageInput from "../../UI/ImageInput"
import Select from "../../UI/Select"
import DeviceInfo from "./DeviceInfo"

const DeviceModalFields:FC<IDeviceModalFields> = ({deviceStates, handleClick}) => {

    const {data:types} = useGetAllTypesQuery()
    const {data:brands} = useGetAllBrandsQuery()

    useEffect(()=> {
        let validModal = [deviceStates.typeId.valid, 
            deviceStates.brandId.valid, 
            deviceStates.name.valid, 
            deviceStates.price.valid,
            deviceStates.image.valid].findIndex( val => 
            val !== ValidationResult.success
        )

        let validInfo = deviceStates.info.findIndex(i => 
            i.titleValid !== ValidationResult.success ||
            i.descriptionValid !== ValidationResult.success)

        if(validModal !== -1 || validInfo !== -1 || !deviceStates.image) {
            deviceStates.setDeviceFormError({...deviceStates.deviceFormError,status:true})
        } else {
            deviceStates.setDeviceFormError({status:false, message: ''})
        }
    },[ deviceStates.typeId, 
        deviceStates.brandId, 
        deviceStates.name, 
        deviceStates.price, 
        deviceStates.image, 
        deviceStates.info])
    
    return (
        <div>
            <Select 
                defaultValue="выберите тип"
                valid={deviceStates.typeId.valid}
                elements={types}
                setValue={deviceStates.setTypeId}
            />
            <Select 
                defaultValue="выберите бренд"
                valid={deviceStates.brandId.valid}
                elements={brands}
                setValue={deviceStates.setBrandId}
            />
            <Input 
                inputView="name"
                element={deviceStates.name}
                setValue={deviceStates.setName} 
            />
            <Input 
                inputView="price"
                element={deviceStates.price}
                setValue={deviceStates.setPrice} 
            />
            <ImageInput
                image={deviceStates.image} 
                setValue={deviceStates.setImage}
            />
            <DeviceInfo 
                info={deviceStates.info}
                setValue={deviceStates.setInfo}
            />
            <button onClick={e => handleClick(e)}>сохранить устройство</button>
            {deviceStates.deviceFormError.message && <ErrorModal error={deviceStates.deviceFormError.message} />}
        </div>
    )
}

export default DeviceModalFields