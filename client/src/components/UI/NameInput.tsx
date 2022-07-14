import { FC, useContext } from "react"
import { ValidationResult } from "../../enum/enum"
import { INameAndPriceInput } from "../../interface/interface"
import { deviceFormValidation, priceFormValidation } from "../../validation/DeviceFormValidation"
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
                value={state!.name.value} 
                onChange={e => changeValue(e.target.value)}
                style={{background: (state!.name.valid === ValidationResult.error) ?
                    "red" : "white"
                }}
            />
        </div>
    )
}

export default NameInput