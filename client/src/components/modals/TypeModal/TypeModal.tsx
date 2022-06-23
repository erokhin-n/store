import {FC, FormEvent, useEffect, useState } from "react"
import { useSaveTypeMutation } from "../../../store/apiSlice/typeSlice"
import { adminFormValidation } from "../../../validation/AdminFormValidation"
import { useFormValidation } from "../../../validation/useFormValidation"
import ErrorModal from "../../ErrorModal"

const TypeModal:FC<any> = () => {

    const [type, setType] = useState<string>('')
    const [typeError, setTypeError] = useState<string>('')
    const [serverError, setServerError] = useState<string>('')

    const [saveType, {isLoading, isError, error}] = useSaveTypeMutation()

    const changeType = (e:string) => {
        // if(typeError) adminFormValidation(type, setTypeError)
        errorServerMessage=""
        setType(e)
    }

    const saveTypeOnServer = (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // const validationSuccess = adminFormValidation(type, setTypeError)
        // if(validationSuccess) {
        //     saveType({name: type})
        //     setType('')
        // }
        saveType({name: type})
    }



    if (isLoading) {
        return <h3>type save loading ....</h3>
    }

    let errorServerMessage:string | undefined

    if (error) {
        if ('status' in error) {
            errorServerMessage = 'error' in error ? 
            error.error : 
                JSON.stringify(error.data)
        } else {
            errorServerMessage = error.message
        }
    }


    return (
        <form>
            <input 
                type = "text"
                placeholder="название типа"
                value={type}  
                onChange={e => changeType(e.target.value)}
            />
            <button onClick={e => saveTypeOnServer(e)}>save</button>
            {typeError && <ErrorModal error={typeError} />}
            {errorServerMessage && <ErrorModal error={errorServerMessage}/>}
        </form>
    )
}

export default TypeModal