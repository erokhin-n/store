import { useState, MouseEvent, ChangeEvent, useEffect } from "react"
import {  IDeviceInfo, IImage, INameAndPrice, ITypeIdAndBrandId } from "../../../interface/interface"
import { v4 as uuidv4 } from 'uuid';
import { useCreateDeviceMutation } from "../../../store/apiSlice/deviceSlice";

import { deviceImageValidation, deviceInfoValidation } from "../../../validation/DeviceFormValidation";
import { deviceFormValidation, priceFormValidation } from "../../../validation/DeviceFormValidation";
import { ValidationResult } from "../../../enum/enum";
import { useGetAllTypesQuery } from "../../../store/apiSlice/typeSlice";
import Select from "../../UI/Select";
import { useGetAllBrandsQuery } from "../../../store/apiSlice/brandSlice";
import Input from "../../UI/DeviceModalInput";
import ImageInput from "../../UI/ImageInput";
import DeviceInfo from "./DeviceInfo";
import ErrorModal from "../../ErrorModal";

const DeviceModal = () => {

    const [typeId, setTypeId] = useState<ITypeIdAndBrandId>({id: 0, valid:ValidationResult.firstAddition})
    const [brandId, setBrandId] = useState<ITypeIdAndBrandId>({id: 0, valid:ValidationResult.firstAddition})
    const [name, setName] = useState<INameAndPrice>({value: '', valid: ValidationResult.firstAddition})
    const [price, setPrice] = useState<INameAndPrice>({value: '', valid: ValidationResult.firstAddition})
    const [image, setImage] = useState<IImage>({file: '',valid:ValidationResult.firstAddition})
    const [info, setInfo] = useState<IDeviceInfo[]>([])
    const [deviceFormError, setDeviceFormError] = useState<{status:boolean, message: string}>({status:false, message: ''})

    const {data:types} = useGetAllTypesQuery()
    const {data:brands} = useGetAllBrandsQuery()

    const [createDevice, { isLoading}] = useCreateDeviceMutation()

    const selectImage = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) setImage({file:e.target.files[0],
            valid:deviceImageValidation(e.target.files[0])}) 
    }  

    const addInfo = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setInfo([...info, {
            title: '',
            titleValid:ValidationResult.firstAddition, 
            description: '', 
            descriptionValid:ValidationResult.firstAddition, 
            id: uuidv4()}])
    }

    const changeInfo = (key:string, keyValid:string, value:string, id:string):void => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value, 
            [keyValid]: deviceInfoValidation(value)}: i))
    }

    const removeInfo = (id:string) => {
        setInfo(info.filter(i => i.id !== id))
    }

    const changeName = (value:string ) => {
        setName({value,valid: deviceFormValidation(value)})
    }

    const changePrice = (value:string ) => {
        setPrice({value,valid: priceFormValidation(value)})
    }

    useEffect(()=> {
        let validModal = [typeId.valid, brandId.valid, name.valid, price.valid].findIndex( val => 
            val !== ValidationResult.success
        )

        let validInfo = info.findIndex(i => 
            i.titleValid !== ValidationResult.success ||
            i.descriptionValid !== ValidationResult.success)

        if(validModal !== -1 || validInfo !== -1 || !image) {
            setDeviceFormError({...deviceFormError,status:true})
        } else {
            setDeviceFormError({status:false, message: ''})
        }
    },[typeId, brandId, name, price, image, info])

    const addDevice = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setTypeId({ id: typeId.id, valid: deviceFormValidation(typeId.id) })
        setBrandId({ id:brandId.id, valid: deviceFormValidation(brandId.id) })
        changeName(name.value)
        changePrice(price.value)
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
        <div>
            <Select 
                defaultValue="выберите тип"
                valid={typeId.valid}
                elements={types}
                setValue={setTypeId}
            />
            <Select 
                defaultValue="выберите бренд"
                valid={brandId.valid}
                elements={brands}
                setValue={setBrandId}
            />
            <Input 
                inputView="name"
                element={name}
                setValue={setName} 
            />
            <Input 
                inputView="price"
                element={price}
                setValue={setPrice} 
            />
            <ImageInput
                image={image} 
                changeValue={selectImage}
            />
            <DeviceInfo 
                info={info}
                addInfo={addInfo}
                changeInfo={changeInfo}
                removeInfo={removeInfo}
            />
            <button onClick={e => addDevice(e)}>сохранить устройство</button>
            {deviceFormError.message && <ErrorModal error={deviceFormError.message} />}
        </div>
    )
}

export default DeviceModal