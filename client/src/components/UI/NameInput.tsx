import { FC, useContext } from "react"
import { ValidationResult } from "../../enums/enums"
import { deviceFormValidation } from "../../validation/DeviceFormValidation"
import { DeviceModalDispatch, DeviceModalState } from "../modals/DeviceModal/DeviceModal"

const NameInput = () => {

    const state = useContext(DeviceModalState)
    const dispatch = useContext(DeviceModalDispatch)

    const changeValue = (value: string) => {
        dispatch!({type:'changeName', payload: {value, valid:deviceFormValidation(value)}})  
    }

    return (
        <div>
            <label>{"название"}</label>
            <input 
                placeholder="введите название"
                value={state!.name.value} 
                onChange={e => changeValue(e.target.value)}
                style={{background: (state!.name.valid === ValidationResult.ERROR) ?
                    "red" : "white"
                }}
            />
            {
                state!.name.valid === ValidationResult.ERROR && 
                    <h4>поле содержит недопустимые символы</h4>
            }
        </div>
    )
}

export default NameInput