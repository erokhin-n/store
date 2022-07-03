import { FC, SetStateAction, useState, MouseEvent, ChangeEvent, useEffect } from "react"
import {  IDeviceInfo, ITypeAndBrand } from "../../../interface/interface"
import style from './DeviceModal.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useCreateDeviceMutation } from "../../../store/apiSlice/deviceSlice";
import { adminFormValidation } from "../../../validation/DeviceFormValidation";

import ErrorModal from "../../ErrorModal";
import { deviceInfoValidation } from "../../../validation/DeviceInfoValidation";

const DeviceModal
:FC<{types:ITypeAndBrand[] | undefined, brands: ITypeAndBrand[] | undefined}> = 
({types, brands}) => {

    const [typeId, setTypeId] = useState<number>()
    const [typeIdError, setTypeIdError] = useState<string>('')
    const [brandId, setBrandId] = useState<number>()
    const [brandIdError, setBrandIdError] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [nameError, setNameError] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [priceError, setPriceError] = useState<string>('')
    const [image, setImage] = useState<string | Blob>('')
    const [info, setInfo] = useState<IDeviceInfo[]>([])
    const [infoError, setInfoError] = useState<any>('')
    const [deviceFormError, setDeviceFormError] = useState<string | ''>('')

    const [createDevice, {data, isLoading,isSuccess}] = useCreateDeviceMutation()

    const selectImage = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) setImage(e.target.files[0]) 
    }  

    const addInfo = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setInfo([...info, {
            title: '',
            titleValid:"firstTime", 
            description: '', 
            descriptionValid:"firstTime", 
            id: uuidv4()}])
    }

    const changeInfo = (key:string, value:string, id:string):void => {
        setInfoError([])
        setInfo(info.map(i => i.id === id ? {...i, [key]: value}: i))
    }

    const removeInfo = (id:string) => {
        setInfo(info.filter(i => i.id !== id))
    }

    const addDevice = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // const typeIdValid = adminFormValidation(typeId, setTypeIdError)
        // const brandIdValid = adminFormValidation(brandId, setBrandIdError)
        // const nameValid = adminFormValidation(name, setNameError)
        // const priceValid = adminFormValidation(price , setPriceError)

        setInfo(info.map(i => 
            ({...i, titleValid:deviceInfoValidation(i.title),
                descriptionValid:deviceInfoValidation(i.description)
            }))
        )

        
        setInfoError(info.filter( i => i.titleValid === "clear"))

        // i.titleValid === "error" || 
        // i.descriptionValid=== "error" || 
        // i.titleValid==="firstTime" || 
        // i.descriptionValid==="firsTime")

    }

    const sendForm = () => {
        const formData = new FormData()
        formData.append('typeId', String(typeId))
        formData.append('brandId', String(brandId))
        formData.append('name', name)
        formData.append('price', String(price))
        formData.append('img', image)
        formData.append('info', JSON.stringify(info))
        createDevice(formData)
    }

    // typeIdValid && brandIdValid && nameValid && 
    //         // image && priceValid

    useEffect(()=> {
        console.log(infoError)
        if(!infoError) {
            sendForm()
        } else {
            setDeviceFormError('исправьте форму перед сохранением устройства')
        }
    },[infoError])

    if(isLoading) return <h3>saved...</h3>
    if(isSuccess) console.log('save complete')

    return (
        <div className={style.deviceForm}>
            <form style={{display:'flex', flexDirection:'column'}}>
                <select>
                    <option>выберите тип</option>
                    {types && types.map(type => 
                        <option
                            key={type.id} 
                            value={type.name}
                            onClick={() => setTypeId(type.id)}
                        >
                            {type.name}
                        </option>    
                    )}
                </select>
                {typeIdError && <ErrorModal error={typeIdError} />}
                <select>
                    <option>выберите бренд</option>
                    {brands && brands.map(brand => 
                        <option
                            key={brand.id} 
                            value={brand.name}
                            onClick={() => setBrandId(brand.id)}
                        >
                            {brand.name}
                        </option>    
                    )}
                </select>
                {brandIdError && <ErrorModal error={brandIdError} />}
                <label>название</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                />
                 {nameError && <ErrorModal error={nameError} />}
                <label>цена</label>
                <input
                    type="number"
                    value={price} 
                    onChange={e => setPrice(Number(e.target.value))}
                />
                {priceError && <ErrorModal error={priceError} />}
                <label>изображение</label>
                <input 
                    type="file"
                    onChange={selectImage}
                />
                <button
                    onClick={addInfo}
                >
                    добавить информацию
                </button>
                {info && info.map( i => 
                    <div key={i.id}>
                        <input 
                            value={i.title}
                            onChange={e => changeInfo('title', e.target.value, i.id)}
                            placeholder="введите название"
                            style={{'background': ((i.titleValid==="clear") || (i.titleValid==="firstTime")) ? "white" : "red"}}
                        />
                        <input 
                            value={i.description}
                            onChange={e => changeInfo('description', e.target.value, i.id)}
                            placeholder="введите описание"
                            style={{'background':(( i.descriptionValid==="clear" )|| (i.descriptionValid==="firstTime" ))? "white" : "red"}}
                        />
                        
                        <button onClick={()=> removeInfo(i.id)}>del</button>
                    </div>   
                )}
                <button onClick={e => addDevice(e)}>сохранить устройство</button>
                {deviceFormError && <ErrorModal error={deviceFormError} />}
            </form>
        </div>
    )
}

export default DeviceModal