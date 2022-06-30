import { FC, SetStateAction, useState, MouseEvent, ChangeEvent } from "react"
import { IDeviceInfo, ITypeAndBrand } from "../../../interface/interface"
import style from './DeviceModal.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useCreateDeviceMutation } from "../../../store/apiSlice/deviceSlice";
import { adminFormValidation } from "../../../validation/AdminFormValidation";
import ErrorModal from "../../ErrorModal";

const DeviceModal
:FC<{types:ITypeAndBrand[] | undefined, brands: ITypeAndBrand[] | undefined}> = 
({types, brands}) => {

    const [typeId, setTypeId] = useState<number>()
    const [brandId, setBrandId] = useState<number>()
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [image, setImage] = useState<string | Blob>('')
    const [info, setInfo] = useState<IDeviceInfo[]>([])
    const [deviceFormError, setDeviceFormError] = useState<string | ''>('')

    const [createDevice, {data, isLoading,isSuccess}] = useCreateDeviceMutation()

    const selectImage = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) setImage(e.target.files[0]) 
    }  

    const addInfo = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setInfo([...info, {title: '', description: '', id: uuidv4()}])
    }

    const changeInfo = (key:string, value:string, id:string):void => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value}: i))
    }

    const removeInfo = (id:string) => {
        setInfo(info.filter(i => i.id !== id))
    }

    const addDevice = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const typeIdValid = adminFormValidation(typeId, setDeviceFormError)
        const brandIdValid = adminFormValidation(brandId, setDeviceFormError)
        const nameValid = adminFormValidation(name, setDeviceFormError)
        const priceValid = adminFormValidation(price, setDeviceFormError)
        info.map(i => {
            adminFormValidation(i.title,setDeviceFormError) 
            adminFormValidation(i.description,setDeviceFormError)
            }
        )
        if(typeIdValid && brandIdValid && nameValid && image && priceValid) {
            const formData = new FormData()
            formData.append('typeId', String(typeId))
            formData.append('brandId', String(brandId))
            formData.append('name', name)
            formData.append('price', String(price))
            formData.append('img', image)
            formData.append('info', JSON.stringify(info))
            createDevice(formData)
        } else {
            setDeviceFormError('перед сохранением устройства все поля формы должны быть заполнены буквами/цифрами')
        }
    }

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
                <label>название</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                />
                <label>цена</label>
                <input
                    type="number"
                    value={price} 
                    onChange={e => setPrice(Number(e.target.value))}
                />
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
                {info && info.map(i => 
                    <div key={i.id}>
                        <input 
                            value={i.title}
                            onChange={e => changeInfo('title', e.target.value, i.id)}
                            placeholder="введите название"
                        />
                        <input 
                            value={i.description}
                            onChange={e => changeInfo('description', e.target.value, i.id)}
                            placeholder="введите описание"
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