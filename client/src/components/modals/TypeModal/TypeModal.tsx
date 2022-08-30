import { FormEvent, useEffect, useState } from "react"
import { ValidationResult } from "../../../enums/enums"
import { ITypeAndBrandModal } from "../../../interface/interface"
import { useSaveTypeMutation } from "../../../store/apiSlice/typeSlice"
import { deviceFormValidation } from "../../../validation/DeviceFormValidation"
import ErrorModal from "../../ErrorModal"

const TypeModal = () => {

    const [type, setType] = useState<ITypeAndBrandModal>({
        value: '', 
        valid: ValidationResult.FIRST_ADDITION, 
        serverInfo: ''
    })

    useEffect(()=> {
        console.log(type.serverInfo)
    },[type.serverInfo])

    useEffect(()=> {
        if(!type.value.length) {
            setType({...type, valid: ValidationResult.FIRST_ADDITION})
        }
    }, [type.value])

    const [saveType, {isLoading}] = useSaveTypeMutation()

    const saveTypeOnServer = (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(type.valid === ValidationResult.SUCCESS) {
            saveType({name: type.value})
            .unwrap()
            .then( res => setType({...type, serverInfo: res.message}))
            .catch(e => setType({...type, serverInfo: e.data.message}))
        } else {   
            setType({
                ...type, 
                valid: ValidationResult.ERROR,
                serverInfo: "Необходимо исправить поле перед отправкой"
            })
        }
    }

    const changeType = (e:string) => {
        setType({...type, value: e, valid: deviceFormValidation(e), serverInfo: ''})
    }

    if (isLoading) {
        return <h3>type save loading ...</h3>
    }

    return (
        <form>
            <input 
                type = "text"
                placeholder="название бренда"
                value={type.value}  
                onChange={e => changeType(e.target.value)}
                style={{border: type.valid === ValidationResult.ERROR ?
                    "2px solid red" : "1px solid black"
                }}
            />
            <button onClick={e => saveTypeOnServer(e)}>save</button>
            {type.serverInfo}
            
        </form>
    )
}

export default TypeModal