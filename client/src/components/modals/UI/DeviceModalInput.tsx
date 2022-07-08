import { FC } from "react"
import { ValidationResult } from "../../../enum/enum"
import { INameAndPriceInput } from "../../../interface/interface"
import ErrorModal from "../../ErrorModal"

const Input:FC<INameAndPriceInput> = ({inputView, element, changeValue}) => {

    let label
    let type
    let errorMessage

    switch (inputView) {
        case ("name"):
            label = "название";
            type = "text";
            errorMessage = "название некорректно"
            break;
        case ("price"):
            label = "цена";
            type = "text";
            errorMessage = "цена некорректна"
            break;
        default:
            break;
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