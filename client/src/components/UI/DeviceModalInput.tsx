import { FC } from "react"
import { ValidationResult } from "../../enum/enum"
import { INameAndPriceInput } from "../../interface/interface"
import { deviceFormValidation, priceFormValidation } from "../../validation/DeviceFormValidation"

const Input:FC<INameAndPriceInput> = ({inputView, element, setValue}) => {

    let label
    let type
    let errorMessage
    let validation:(value:string) => string

    switch (inputView) {
        case ("name"):
            label = "название";
            type = "text";
            errorMessage = "название некорректно"
            validation = deviceFormValidation;
            break;
        case ("price"):
            label = "цена";
            type = "text";
            errorMessage = "цена некорректна";
            validation = priceFormValidation;
            break;
        default:
            break;
    }

    const changeValue = (value: string) => {
        setValue({value, valid: validation(value)})    
    }

    return (
        <div>
            <label>{label}</label>
            <input 
                type={type}
                value={element.value} 
                onChange={e => changeValue(e.target.value)}
                style={{background: (element.valid === ValidationResult.error) ?
                    "red" : "white"
                }}
            />
            {/* {element.valid === ValidationResult.error 
                && <ErrorModal error={errorMessage} />} */}
        </div>
    )
}

export default Input