import { FC } from "react"
import { ValidationResult } from "../../../enum/enum"
import { ISelect } from "../../../interface/interface"
import ErrorModal from "../../ErrorModal"

const Select:FC<ISelect> = ({ defaultValue,valid,elements, changeValue, }) => {

    return (
        <div>
            <select 
                style={{
                border: ((valid === ValidationResult.firstAddition) || 
                (valid === ValidationResult.success))? 
                    "2px solid black" : "3px solid red"}}
                >
            <option onClick={() => changeValue(0)}>{defaultValue}</option>
            {elements && elements.map(element => 
                <option
                    key={element.id} 
                    value={element.name}
                    onClick={() => changeValue(element.id!)}
                >
                    {element.name}
                </option>    
            )}
        </select>
        {valid === ValidationResult.error && <ErrorModal error={"выберите значение"} />}
    </div>
    )
}

export default Select