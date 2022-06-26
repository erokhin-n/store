import { FormEvent, useEffect, useState } from "react"
import { useSaveBrandMutation } from "../../../store/apiSlice/brandSlice"
import { adminFormValidation } from "../../../validation/AdminFormValidation"
import ErrorModal from "../../ErrorModal"

const BrandModal = () => {

    const [brand, setBrand] = useState<string>('')
    const [brandError, setBrandError] = useState<string>('')
    const [serverError, setServerError] = useState<string>('')

    const [saveBrand, {isLoading, error}] = useSaveBrandMutation()

    const saveBrandOnServer = (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const validationSuccess = adminFormValidation(brand, setBrandError)
        if(validationSuccess){
            saveBrand({name: brand}) 
            setBrand('')       
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

    const changeBrand = (e:string) => {
        if(brandError) adminFormValidation(brand, setBrandError)
        setServerError('')
        setBrand(e)
    }

    if (isLoading) {
        return <h3>brand save loading ...</h3>
    }

    return (
        <form>
            <input 
                type = "text"
                placeholder="название бренда"
                value={brand}  
                onChange={e => changeBrand(e.target.value)}
            />
            <button onClick={e => saveBrandOnServer(e)}>save</button>
            {brandError && <ErrorModal error={brandError} />}
            {serverError && <ErrorModal error={serverError
                .split(":")[1]
                .replace(/[\\\}]/gi, '')}/>}
        </form>
    )
}

export default BrandModal