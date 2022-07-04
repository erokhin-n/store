import { FC, SetStateAction, useState, MouseEvent, ChangeEvent, useEffect, useLayoutEffect } from "react"
import {  IDeviceInfo, ITypeAndBrand } from "../../../interface/interface"
import style from './DeviceModal.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useCreateDeviceMutation } from "../../../store/apiSlice/deviceSlice";
import { adminFormValidation } from "../../../validation/DeviceFormValidation";

import ErrorModal from "../../ErrorModal";
import { deviceInfoValidation } from "../../../validation/DeviceInfoValidation";
import { resolve } from "node:path/win32";

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
    const [clickCount, setClickCount] = useState<any>(1)

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

    const changeInfo = (key:string, keyValid:string, value:string, id:string):void => {
        setInfoError([])
        setInfo(info.map(i => i.id === id ? {...i, [key]: value, 
            [keyValid]: deviceInfoValidation(value)}: i))
    }

    const removeInfo = (id:string) => {
        setInfo(info.filter(i => i.id !== id))
    }

    const addDevice = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setClickCount(clickCount + 1)
        // const typeIdValid = adminFormValidation(typeId, setTypeIdError)
        // const brandIdValid = adminFormValidation(brandId, setBrandIdError)
        // const nameValid = adminFormValidation(name, setNameError)
        // const priceValid = adminFormValidation(price , setPriceError)

        setInfo(info.map(i => 
            ({...i, titleValid:deviceInfoValidation(i.title),
                descriptionValid:deviceInfoValidation(i.description)
            }))
        )
        // function infoResult () {
        //     const test = info.find(i => i.titleValid === "clear")
        //     return new Promise((res, rej) => res(test))
        // }
        
        // const result = await infoResult()
        
        // console.log(result)


        // for(let i = 0; i < info.length; i++) {
        //     if(deviceInfoValidation(info[i].title) !== "clear"){
        //         info[i].titleValid = 'error'
        //         valid = false
        //     } else {
        //         info[i].titleValid = 'clear'
        //         valid = true
        //     }
        // }


        // if(valid) {
        //     sendForm()
        //     setDeviceFormError('')
        // } else {
        //     setDeviceFormError('исправьте форму перед сохранением устройства')
        // }
        sendForm()
    }

    useEffect(()=> {
        console.log('infoValidation work!' + infoError)

        // setInfo(info.map(i => 
        //     ({...i, titleValid:deviceInfoValidation(i.title),
        //         descriptionValid:deviceInfoValidation(i.description)
        //     }))
        // )
    },[infoError])

    useEffect(()=> {  
        // console.log('infoError work')
        info.map(i => {
            if(i.titleValid !== "clear" || i.descriptionValid !== "clear") {
                setInfoError(true)
            } else {
                setInfoError(false)
            }
        })
    },[info])


    const sendForm = () => {
        if(!infoError) {
            console.log("SENDED!")
        } else {
            console.log("DONT SEND")
            setDeviceFormError("исправьте форму!")
        }
        // const formData = new FormData()
        // formData.append('typeId', String(typeId))
        // formData.append('brandId', String(brandId))
        // formData.append('name', name)
        // formData.append('price', String(price))
        // formData.append('img', image)
        // formData.append('info', JSON.stringify(info))
        // createDevice(formData)
    }

    // typeIdValid && brandIdValid && nameValid && 
    //         // image && priceValid

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
                            onChange={e => changeInfo('title', 'titleValid',e.target.value, i.id)}
                            placeholder="введите название"
                            style={{'background': ((i.titleValid==="clear") || (i.titleValid==="firstTime")) ? "white" : "red"}}
                        />
                        <input 
                            value={i.description}
                            onChange={e => changeInfo('description', 'descriptionValid',e.target.value, i.id)}
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