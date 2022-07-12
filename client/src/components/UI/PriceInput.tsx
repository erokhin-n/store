import { FC, useContext } from "react"
import { ValidationResult } from "../../enum/enum"
import { INameAndPriceInput } from "../../interface/interface"
import { priceFormValidation } from "../../validation/DeviceFormValidation"
import { DeviceModalDispatch, DeviceModalState } from "../modals/DeviceModal/DeviceModal"

const PriceInput = () => {

    const state:any = useContext(DeviceModalState)
    const dispatch:any = useContext(DeviceModalDispatch)

    const changeValue = (value: string) => {
        dispatch({type:'changePrice', payload: value})
        dispatch({type:'setPriceValid', payload: priceFormValidation(value)})    
    }

    return (
        <div>
            <label>{"стоимость"}</label>
            <input 
                value={state.price} 
                onChange={e => changeValue(e.target.value)}
                style={{background: (state.priceValid === ValidationResult.error) ?
                    "red" : "white"
                }}
            />
        </div>
    )
}

export default PriceInput