import { FC, useEffect, MouseEvent, useContext} from "react"
import { ValidationResult } from "../../../enum/enum"
import { IDeviceInfoComponent } from "../../../interface/interface"
import { deviceFormValidation, deviceInfoValidation } from "../../../validation/DeviceFormValidation"
import { v4 as uuidv4 } from 'uuid';
import { DeviceModalDispatch, DeviceModalState } from "./DeviceModal";

const DeviceInfo = () => {

    const state:any = useContext(DeviceModalState)
    const dispatch:any = useContext(DeviceModalDispatch)

    const addInfo = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch({type: "addInfo" ,payload: [...state.info, {
            title: '',
            titleValid:ValidationResult.firstAddition, 
            description: '', 
            descriptionValid:ValidationResult.firstAddition, 
            id: uuidv4()}]})
    }

    const changeTitle = (value:any,id:any) => {
        dispatch({type:'changeTitle',
            payload: {value, id, valid:deviceFormValidation(value)}
        })
    } 

    const changeDescription = (value:any, id: any) => {
        dispatch({type: 'changeDescription',
            payload: {value, id, valid:deviceFormValidation(value)}
        })
    }

    const removeInfo = (id:string) => {
        dispatch({type:'removeInfo', payload: id})
    }
    
    return (
        <div>
            <button
                onClick={addInfo}
            >
                добавить информацию
            </button>
            {state.info && state.info.map( (i:any) => 
                <div key={i.id}>
                    <input 
                        value={i.title}
                        onChange = {e => changeTitle(e.target.value, i.id)}
                        placeholder="введите название"
                        style={{'background': (i.titleValid !== ValidationResult.error)  ? 
                        "white" : "red"}}
                    />
                    <input 
                        value={i.description}
                        onChange={(e:any) => changeDescription(e.target.value, i.id)}
                        placeholder="введите описание"
                        style={{'background':( i.descriptionValid !== ValidationResult.error ) ? 
                        "white" : "red"}}
                    />
                    
                    <button onClick={()=> removeInfo(i.id)}>del</button>
                </div>   
            )}
        </div>
    )
}

export default DeviceInfo