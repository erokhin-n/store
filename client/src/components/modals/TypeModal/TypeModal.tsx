import { FormEvent, useEffect, useState } from "react"
import { useSaveTypeMutation } from "../../../store/apiSlice/typeSlice"
import { deviceFormValidation } from "../../../validation/DeviceFormValidation"   
import ErrorModal from "../../ErrorModal"

const TypeModal = () => {

    const [type, setType] = useState<string>('')
    const [typeError, setTypeError] = useState<string>('')
    const [serverError, setServerError] = useState<string>('')

    const [saveType, {isLoading, isError, error}] = useSaveTypeMutation()

    const saveTypeOnServer = (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const validationSuccess = deviceFormValidation(type, setTypeError)
        if(validationSuccess) {
            saveType({name: type})
            setType('')
        }
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

    useEffect(()=>{
        if(errorServerMessage) setServerError(errorServerMessage)     
    },[errorServerMessage])

    const changeType = (e:string) => {
        if(typeError) deviceFormValidation(type, setTypeError)
        setServerError('')
        setType(e)
    }

    if (isLoading) {
        return <h3>type save loading ....</h3>
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
            {serverError && <ErrorModal error={serverError
                .split(":")[1]
                .replace(/[\\\}]/gi, '')}/>}
        </form>
    )
}

export default TypeModal