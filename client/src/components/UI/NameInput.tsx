import { FC, useContext } from "react"
import { ValidationResult } from "../../enum/enum"
import { INameAndPriceInput } from "../../interface/interface"
import { deviceFormValidation, priceFormValidation } from "../../validation/DeviceFormValidation"
import { DeviceModalDispatch, DeviceModalState } from "../modals/DeviceModal/DeviceModal"

const NameInput = () => {

    const state:any = useContext(DeviceModalState)
    const dispatch:any = useContext(DeviceModalDispatch)

    const changeValue = (value: string) => {
        dispatch({type:'changeName', payload: value})
        dispatch({type:'setNameValid', payload: deviceFormValidation(value)})    
    }

    return (
        <div>
            <label>{"название"}</label>
            <input 
                value={state.name} 
                onChange={e => changeValue(e.target.value)}
                style={{background: (state.nameValid === ValidationResult.error) ?
                    "red" : "white"
                }}
            />
        </div>
    )
}

export default NameInput