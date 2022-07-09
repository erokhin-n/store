import { useState, MouseEvent } from "react"
import {  IDeviceFormError, IDeviceInfo, IImage, INameAndPrice, ITypeIdAndBrandId } from "../../../interface/interface"
import { useCreateDeviceMutation } from "../../../store/apiSlice/deviceSlice";
import { deviceImageValidation, deviceInfoValidation , deviceFormValidation, priceFormValidation} from "../../../validation/DeviceFormValidation";
import { ValidationResult } from "../../../enum/enum";
import DeviceModalFields from "./DeviceModalFields";

const DeviceModal = () => {

    const [typeId, setTypeId] = useState<ITypeIdAndBrandId>({id: 0, valid:ValidationResult.firstAddition})
    const [brandId, setBrandId] = useState<ITypeIdAndBrandId>({id: 0, valid:ValidationResult.firstAddition})
    const [name, setName] = useState<INameAndPrice>({value: '', valid: ValidationResult.firstAddition})
    const [price, setPrice] = useState<INameAndPrice>({value: '', valid: ValidationResult.firstAddition})
    const [image, setImage] = useState<IImage>({file: '',valid:ValidationResult.firstAddition})
    const [info, setInfo] = useState<IDeviceInfo[]>([])
    const [deviceFormError, setDeviceFormError] = useState<IDeviceFormError>({status:false, message: ''})

    const deviceStates = {
        typeId, setTypeId, 
        brandId, setBrandId, 
        name, setName,
        price, setPrice, 
        image, setImage,
        info, setInfo,
        deviceFormError, setDeviceFormError
    }

    const [createDevice, { isLoading}] = useCreateDeviceMutation()

    const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setTypeId({ id: typeId.id, valid: deviceFormValidation(typeId.id) })
        setBrandId({ id:brandId.id, valid: deviceFormValidation(brandId.id) })
        setName({value:name.value,valid: deviceFormValidation(name.value)})
        setPrice({value:price.value,valid: priceFormValidation(price.value)})
        setImage({file:image.file, valid:deviceImageValidation(image.file)})
        
        setInfo(info.map(i => 
            ({...i, titleValid:deviceInfoValidation(i.title),
                descriptionValid:deviceInfoValidation(i.description)
            }))
        )

        if(!deviceFormError.status) {
            setDeviceFormError({...deviceFormError, message:""})
            const formData = new FormData()
            formData.append('typeId', String(typeId.id))
            formData.append('brandId', String(brandId.id))
            formData.append('name', name.value)
            formData.append('price', price.value)
            formData.append('img', image.file)
            formData.append('info', JSON.stringify(info))
            createDevice(formData)
            setTypeId({id: 0, valid:ValidationResult.firstAddition})
            setBrandId({id: 0, valid:ValidationResult.firstAddition})
            setName({value: '', valid: ValidationResult.firstAddition})
            setPrice({value: '', valid: ValidationResult.firstAddition})
            setImage({file: '',valid:ValidationResult.firstAddition})
            setInfo([])
        } else {
            setDeviceFormError({...deviceFormError, message:"исправьте форму"})
        }
    }

    if(isLoading) return <h3>saved...</h3>

    return (
        <DeviceModalFields 
            deviceStates={deviceStates} 
            handleClick={handleClick} 
        />
    )
}

export default DeviceModal