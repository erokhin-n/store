import {FC, FormEvent, useState } from "react"
import { useSaveTypeMutation } from "../../../store/apiSlice/typeSlice"
import { adminFormValidation } from "../../../validation/AdminFormValidation"
import ErrorModal from "../../ErrorModal"

const TypeModal:FC<any> = ({typeError, setTypeError}) => {

    const [saveType, {isLoading, isError}] = useSaveTypeMutation()

    const [type, setType] = useState<string>('')

    const changeType = (e:string) => {
        adminFormValidation(type, setTypeError)
        setType(e)
    }

    const saveTypeOnServer = (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        adminFormValidation(type, setTypeError)
        if(!typeError){
            saveType({name: type})        
        }
    }

    if (isLoading) {
        return <h3>type save loading ....</h3>
    }

    return (
        <form>
            <input 
                type = "text"
                placeholder="название бренда"
                value={type}  
                onChange={e => changeType(e.target.value)}
                onBlur={() => adminFormValidation(type, setTypeError)}
            />
            <button onClick={e => saveTypeOnServer(e)}>save</button>
            {typeError && <ErrorModal error={typeError} />}
        </form>
    )
}

export default TypeModal