import { FC, useEffect, MouseEvent} from "react"
import { ValidationResult } from "../../../enum/enum"
import { IDeviceInfoComponent } from "../../../interface/interface"
import { deviceInfoValidation } from "../../../validation/DeviceFormValidation"
import { v4 as uuidv4 } from 'uuid';

const DeviceInfo:FC<IDeviceInfoComponent> = ({
    info, setValue}) => {

    const addInfo = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setValue([...info, {
            title: '',
            titleValid:ValidationResult.firstAddition, 
            description: '', 
            descriptionValid:ValidationResult.firstAddition, 
            id: uuidv4()}])
    }

    const changeInfo = (key:string, keyValid:string, value:string, id:string):void => {
        setValue(info.map(i => i.id === id ? {...i, [key]: value, 
            [keyValid]: deviceInfoValidation(value)}: i))
    }

    const removeInfo = (id:string) => {
        setValue(info.filter(i => i.id !== id))
    }
    
    return (
        <div>
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
                        style={{'background': ((i.titleValid===ValidationResult.success) || 
                            (i.titleValid===ValidationResult.firstAddition)) ? "white" : "red"}}
                    />
                    <input 
                        value={i.description}
                        onChange={e => changeInfo('description', 'descriptionValid',e.target.value, i.id)}
                        placeholder="введите описание"
                        style={{'background':(( i.descriptionValid===ValidationResult.success ) || 
                            (i.descriptionValid===ValidationResult.firstAddition ))? "white" : "red"}}
                    />
                    
                    <button onClick={()=> removeInfo(i.id)}>del</button>
                </div>   
            )}
        </div>
    )
}

export default DeviceInfo