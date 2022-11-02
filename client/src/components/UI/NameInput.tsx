import { useContext, useEffect } from "react"
import { ValidationResult } from "../../enums/enums"
import { deviceFormValidation } from "../../validation/DeviceFormValidation"
import { DeviceModalDispatch, DeviceModalState } from "../modals/DeviceModal/DeviceModal"

const NameInput = () => {

    const state = useContext(DeviceModalState)
    const dispatch = useContext(DeviceModalDispatch)


    const changeValue = (value: string) => {
        dispatch!({type:"changeNameValue", payload: value})
    }

    useEffect(()=> {
        if(!state!.name.value.length) {
            dispatch!({type:"changeNameValid", payload: ValidationResult.FIRST_ADDITION})
        } else {
            dispatch!({type:"changeNameValid", payload: deviceFormValidation(state!.name.value)})
        }
    },[state!.name.value])

    return (
        <div className="modalInputContainer">
            <label className="deviceModalLabel">{"название"}</label>
            <input 
                type="text"
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