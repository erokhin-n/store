import { FC, useEffect, MouseEvent, useContext} from "react"
import { ValidationResult } from "../../../enums/enums"
import { IDeviceInfo } from "../../../interface/interface"
import { deviceFormValidation, deviceInfoValidation } from "../../../validation/DeviceFormValidation"
import { v4 as uuidv4 } from 'uuid';
import { DeviceModalDispatch, DeviceModalState } from "./DeviceModal";

const DeviceInfo = () => {

    const state = useContext(DeviceModalState)
    const dispatch = useContext(DeviceModalDispatch)

    const addInfo = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch!({type: "addInfo" ,payload: [...state!.info, {
            title: '',
            titleValid:ValidationResult.FIRST_ADDITION, 
            description: '', 
            descriptionValid:ValidationResult.FIRST_ADDITION, 
            id: uuidv4()}]})
    }

    const changeTitle = (value:string,id:string) => {
        dispatch!({type:'changeTitle',
            payload: {value, id, valid:deviceFormValidation(value)}
        })
    } 

    const changeDescription = (value:string, id:string) => {
        dispatch!({type: 'changeDescription',
            payload: {value, id, valid:deviceFormValidation(value)}
        })
    }

    const removeInfo = (id:string) => {
        dispatch!({type:'removeInfo', payload: id})
    }
    
    return (
        <div>
            <button
                onClick={addInfo}
            >
                добавить информацию
            </button>
            {state!.info && state!.info.map( (i:IDeviceInfo, index) => 
                <div key={i.id}>
                    <div data-testid={"titleContainer"+index}>
                        <input 
                            value={i.title}
                            onChange = {e => changeTitle(e.target.value, i.id)}
                            placeholder="введите заголовок"
                            style={{'background': (i.titleValid !== ValidationResult.ERROR)  ? 
                            "white" : "red"}}
                            
                        />
                        {i.titleValid === ValidationResult.ERROR && <span>title err</span>}
                    </div>
                    <div data-testid={"descriptionContainer"+index}>
                        <input 
                            value={i.description}
                            onChange={e => changeDescription(e.target.value, i.id)}
                            placeholder="введите описание"
                            style={{'background':( i.descriptionValid !== ValidationResult.ERROR ) ? 
                            "white" : "red"}}
                        />
                        {i.descriptionValid === ValidationResult.ERROR && <span>description err</span>}
                    </div>
                    <button onClick={()=> removeInfo(i.id)}>del</button>
                </div>   
            )}
        </div>
    )
}

export default DeviceInfo