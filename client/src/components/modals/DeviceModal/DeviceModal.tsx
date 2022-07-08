import { useState, MouseEvent, ChangeEvent, useEffect } from "react"
import {  IDeviceInfo, INameAndPrice, ITypeIdAndBrandId } from "../../../interface/interface"
import { v4 as uuidv4 } from 'uuid';
import { useCreateDeviceMutation } from "../../../store/apiSlice/deviceSlice";

import { deviceInfoValidation } from "../../../validation/DeviceInfoValidation";
import { deviceFormValidation, priceFormValidation } from "../../../validation/DeviceFormValidation";
import { ValidationResult } from "../../../enum/enum";
import { useGetAllTypesQuery } from "../../../store/apiSlice/typeSlice";
import Select from "../UI/Select";
import { useGetAllBrandsQuery } from "../../../store/apiSlice/brandSlice";
import Input from "../UI/DeviceModalInput";
import ImageInput from "../UI/ImageInput";

const DeviceModal = () => {
    const [typeId, setTypeId] = useState<ITypeIdAndBrandId>({id: 0, valid:ValidationResult.firstAddition})
    const [brandId, setBrandId] = useState<ITypeIdAndBrandId>({id: 0, valid:ValidationResult.firstAddition})
    const [name, setName] = useState<INameAndPrice>({value: '', valid: ValidationResult.firstAddition})
    const [price, setPrice] = useState<INameAndPrice>({value: '', valid: ValidationResult.firstAddition})
    const [image, setImage] = useState<string | Blob>('')
    const [info, setInfo] = useState<IDeviceInfo[]>([])
    const [infoError, setInfoError] = useState<boolean>(false)
    const [deviceFormError, setDeviceFormError] = useState<string | ''>('')

    const {data:types,isSuccess:successTypesLoad} = useGetAllTypesQuery()
    const {data:brands,isSuccess:successBrandsLoad} = useGetAllBrandsQuery()

    const [createDevice, {data, isLoading,isSuccess}] = useCreateDeviceMutation()

    const selectImage = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) setImage(e.target.files[0]) 
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
        setInfoError(false)
        setInfo(info.map(i => i.id === id ? {...i, [key]: value, 
            [keyValid]: deviceInfoValidation(value)}: i))
    }

    const removeInfo = (id:string) => {
        setInfo(info.filter(i => i.id !== id))
    }

    const changeTypeId = (id:number) => {
        setTypeId({ id, valid: deviceFormValidation(id) })
    }
    const changeBrandId = (id:number) => {
        setBrandId({ id, valid: deviceFormValidation(id) })
    }

    const changeName = (value:string ) => {
        setName({value,valid: deviceFormValidation(value)})
    }

    const changePrice = (value:string ) => {
        setPrice({value,valid: priceFormValidation(value)})
    }

    const addDevice = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // const typeIdValid = deviceFormValidation(typeId, setTypeIdError)
        // const brandIdValid = deviceFormValidation(brandId, setBrandIdError)
        // const nameValid = deviceFormValidation(name, setNameError)
        // const priceValid = deviceFormValidation(price , setPriceError)
        changeTypeId(typeId.id)


        setInfo(info.map(i => 
            ({...i, titleValid:deviceInfoValidation(i.title),
                descriptionValid:deviceInfoValidation(i.description)
            }))
        )
        // if(!infoError && typeIdValid && brandIdValid && 
            // nameValid && image && priceValid) {
            const formData = new FormData()
            formData.append('typeId', String(typeId.id))
            formData.append('brandId', String(brandId))
            formData.append('name', name.value)
            formData.append('price', String(price))
            formData.append('img', image)
            formData.append('info', JSON.stringify(info))
            createDevice(formData)
            setDeviceFormError("")
        // } else {
            // setDeviceFormError("исправьте форму перед отправкой")
        // }
    }

    // useEffect(()=> {
    //     console.log(typeId)
    // },[typeId])

    useEffect(()=> {  
        let infoValidError = info.findIndex(i => 
            i.titleValid !== ValidationResult.success ||
            i.descriptionValid !== ValidationResult.success)
        if(infoValidError !== -1) {
            setInfoError(true)
        } else {
            setInfoError(false)
        }

    },[info, infoError])


    if(isLoading) return <h3>saved...</h3>
    if(isSuccess) console.log('save complete')

    return (
        <div>
            <Select 
                defaultValue="выберите тип"
                valid={typeId.valid}
                elements={types}
                changeValue={changeTypeId}
            />
            <Select 
                defaultValue="выберите бренд"
                valid={brandId.valid}
                elements={brands}
                changeValue={changeBrandId}
            />
            <Input 
                inputView="name"
                element={name}
                changeValue={changeName} 
            />

            <Input 
                inputView="price"
                element={price}
                changeValue={changePrice} 
            />
            <ImageInput 
                changeValue={selectImage}
            />
            
        </div>

        // <DeviceModalFields
        //     setBrandId={setBrandId}
        //     brandIdError={brandIdError}
        //     name={name}
        //     setName={setName}
        //     nameError={nameError}
        //     price={price}
        //     setPrice={setPrice}
        //     priceError={priceError}
        //     selectImage={selectImage}
        //     addInfo={addInfo}
        //     info={info}
        //     changeInfo={changeInfo}
        //     removeInfo={removeInfo}
        //     addDevice={addDevice}
        //     deviceFormError={deviceFormError}
        //     changeTypeId={changeTypeId}
        // />
    )
}

export default DeviceModal