import { ChangeEventHandler, FormEvent, useState } from "react"
import { useSaveBrandMutation } from "../../../store/apiSlice/brandSlice"
import { adminFormValidation } from "../../../validation/AdminFormValidation"
import ErrorModal from "../../ErrorModal"

const BrandModal = () => {

    const [saveBrand, {isLoading}] = useSaveBrandMutation()

    const [brand, setBrand] = useState<string>('')
    const [brandError, setBrandError] = useState<string>('')

    const changeBrand = (e:string) => {
        if(brandError) adminFormValidation(brand, setBrandError)
        setBrand(e)
    }
 
    const saveBrandOnServer = (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const validationSuccess = adminFormValidation(brand, setBrandError)
        if(validationSuccess){
            saveBrand({name: brand}) 
            setBrand('')       
        }
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
        </form>
    )
}

export default BrandModal