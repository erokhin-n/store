import { useState, MouseEvent, ChangeEvent, useEffect } from "react"
import {  IDeviceInfo } from "../../../interface/interface"
import { v4 as uuidv4 } from 'uuid';
import { useCreateDeviceMutation } from "../../../store/apiSlice/deviceSlice";

import { deviceInfoValidation } from "../../../validation/DeviceInfoValidation";
import { deviceFormValidation } from "../../../validation/DeviceFormValidation";
import DeviceModalFields from "./DeviceModalFields";

const DeviceModal = () => {
    const [typeSelect, setTypeId] = useState<any>({id:'', valid:"firstAddition"})
    const [typeIdError, setTypeIdError] = useState<string>('')
    const [brandId, setBrandId] = useState<number>()
    const [brandIdError, setBrandIdError] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [nameError, setNameError] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [priceError, setPriceError] = useState<string>('')
    const [image, setImage] = useState<string | Blob>('')
    const [info, setInfo] = useState<IDeviceInfo[]>([])
    const [infoError, setInfoError] = useState<boolean>(false)
    const [deviceFormError, setDeviceFormError] = useState<string | ''>('')

    const [createDevice, {data, isLoading,isSuccess}] = useCreateDeviceMutation()

    const selectImage = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) setImage(e.target.files[0]) 
    }  

    const addInfo = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setInfo([...info, {
            title: '',
            titleValid:"firstAddition", 
            description: '', 
            descriptionValid:"firstAddition", 
            id: uuidv4()}])
    }

    const changeInfo = (key:string, keyValid:string, value:string, id:string):void => {
        setInfoError(false)
        setInfo(info.map(i => i.id === id ? {...i, [key]: value, 
            [keyValid]: deviceInfoValidation(value)}: i))
    }

    const removeInfo = (id:string) => {
        setInfo(info.filter(i => i.id !== id))
    }

    const changeTypeId = (id:any) => {
        setTypeId({ id, typeIdValid: deviceFormValidation(id, setTypeIdError) })
    }

    const addDevice = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const typeIdValid = deviceFormValidation(typeId, setTypeIdError)
        const brandIdValid = deviceFormValidation(brandId, setBrandIdError)
        const nameValid = deviceFormValidation(name, setNameError)
        const priceValid = deviceFormValidation(price , setPriceError)
        changeTypeId(typeId.id)


        setInfo(info.map(i => 
            ({...i, titleValid:deviceInfoValidation(i.title),
                descriptionValid:deviceInfoValidation(i.description)
            }))
        )
        if(!infoError && typeIdValid && brandIdValid && 
            nameValid && image && priceValid) {
            const formData = new FormData()
            formData.append('typeId', String(typeId))
            formData.append('brandId', String(brandId))
            formData.append('name', name)
            formData.append('price', String(price))
            formData.append('img', image)
            formData.append('info', JSON.stringify(info))
            createDevice(formData)
            setDeviceFormError("")
        } else {
            setDeviceFormError("исправьте форму перед отправкой")
        }
    }

    useEffect(()=> {
        console.log(typeId)
    },[typeId])

    useEffect(()=> {  
        let infoValidError = info.findIndex(i => 
            i.titleValid !== "valid" ||
            i.descriptionValid !== "valid")
        if(infoValidError !== -1) {
            setInfoError(true)
        } else {
            setInfoError(false)
        }

    },[info, infoError])


    if(isLoading) return <h3>saved...</h3>
    if(isSuccess) console.log('save complete')

    return (
        <DeviceModalFields
            typeId={typeId}
            setTypeId={setTypeId}
            typeIdError={typeIdError}
            setBrandId={setBrandId}
            brandIdError={brandIdError}
            name={name}
            setName={setName}
            nameError={nameError}
            price={price}
            setPrice={setPrice}
            priceError={priceError}
            selectImage={selectImage}
            addInfo={addInfo}
            info={info}
            changeInfo={changeInfo}
            removeInfo={removeInfo}
            addDevice={addDevice}
            deviceFormError={deviceFormError}
            changeTypeId={changeTypeId}
        />
    )
}

export default DeviceModal