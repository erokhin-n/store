import { FC, useContext } from "react"
import { ValidationResult } from "../../enums/enums"
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
                placeholder="введите цену"
                value={state!.price.value} 
                onChange={e => changeValue(e.target.value)}
                style={{background: (state!.price.valid === ValidationResult.ERROR) ?
                    "red" : "white"
                }}
            />
            {state!.price.valid === ValidationResult.ERROR && 
                    <h4>цена содержит недопустимые символы</h4>}
        </div>
    )
}

export default PriceInput