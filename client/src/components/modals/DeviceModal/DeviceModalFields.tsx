import { FC } from 'react'
import { IDeviceModalFiels } from '../../../interface/interface'
import { useGetAllBrandsQuery } from '../../../store/apiSlice/brandSlice'
import { useGetAllTypesQuery } from '../../../store/apiSlice/typeSlice'
import ErrorModal from '../../ErrorModal'
import style from './DeviceModal.module.css'

const DeviceModalFields:FC<IDeviceModalFiels> = ({
    typeId,
    setBrandId,
    brandIdError,
    name,
    setName,
    nameError,
    price,
    setPrice,
    priceError,
    selectImage,
    addInfo,
    info,
    changeInfo,
    removeInfo,
    addDevice,
    deviceFormError,
    changeTypeId
    }) => {

    const {data:types,isSuccess:successTypesLoad} = useGetAllTypesQuery()
    const {data:brands,isSuccess:successBrandsLoad} = useGetAllBrandsQuery()
    
    return (
        <div className={style.deviceForm}>
            <form style={{display:'flex', flexDirection:'column'}}>
                <select style={{border: ((typeId.typeIdValid === "firstAddition") || 
                               (typeId.typeIdValid === "valid"))? 
                                "2px solid black" : "3px solid red"
                            }}>
                    <option onClick={() => changeTypeId(0)}>выберите тип</option>
                    {types && types.map(type => 
                        <option
                            key={type.id} 
                            value={type.name}
                            onClick={() => changeTypeId(type.id)}
                        >
                            {type.name}
                        </option>    
                    )}
                </select>
                {typeId.typeIdValid === "error" && <ErrorModal error={"исправьте поле"} />}
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
                            style={{'background': ((i.titleValid==="valid") || (i.titleValid==="firstAddition")) ? "white" : "red"}}
                        />
                        <input 
                            value={i.description}
                            onChange={e => changeInfo('description', 'descriptionValid',e.target.value, i.id)}
                            placeholder="введите описание"
                            style={{'background':(( i.descriptionValid==="valid" )|| (i.descriptionValid==="firstAddition" ))? "white" : "red"}}
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

export default DeviceModalFields