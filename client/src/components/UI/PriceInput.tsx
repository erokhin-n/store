import { FC, useContext } from "react"
import { ValidationResult } from "../../enum/enum"
import { priceFormValidation } from "../../validation/DeviceFormValidation"
import { DeviceModalDispatch, DeviceModalState } from "../modals/DeviceModal/DeviceModal"

const PriceInput = () => {

    const state = useContext(DeviceModalState)
    const dispatch = useContext(DeviceModalDispatch)

    const changeValue = (value: string) => {
        dispatch!({type:'changePrice', payload: {value, valid: priceFormValidation(value)}})  
    }

    return (
        <div>
            <label>{"стоимость"}</label>
            <input 
                value={state!.price.value} 
                onChange={e => changeValue(e.target.value)}
                style={{background: (state!.price.valid === ValidationResult.error) ?
                    "red" : "white"
                }}
            />
        </div>
    )
}

export default PriceInput