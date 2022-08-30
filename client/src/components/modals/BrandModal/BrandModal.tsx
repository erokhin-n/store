import { FormEvent, useEffect, useState } from "react"
import { ValidationResult } from "../../../enums/enums"
import { ITypeAndBrandModal } from "../../../interface/interface"
import { useSaveBrandMutation } from "../../../store/apiSlice/brandSlice"
import { deviceFormValidation } from "../../../validation/DeviceFormValidation"
import ErrorModal from "../../ErrorModal"

const BrandModal = () => {

    const [brand, setBrand] = useState<ITypeAndBrandModal>({
        value: '', 
        valid: ValidationResult.FIRST_ADDITION, 
        serverInfo: ''
    })

    const [saveBrand, {isLoading}] = useSaveBrandMutation()

    const saveBrandOnServer = (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        saveBrand({name: brand.value})
        .unwrap()
        .then( res =>setBrand({...brand, serverInfo: res.message}))
        .catch(e => {console.log(e.data.message); setBrand({...brand, serverInfo: e.data.message})})
    }

    const changeBrand = (e:string) => {
        setBrand({...brand, value: e, valid: deviceFormValidation(e)})
    }

    if (isLoading) {
        return <h3>brand save loading ...</h3>
    }

    return (
        <form>
            <input 
                type = "text"
                placeholder="название бренда"
                value={brand.value}  
                onChange={e => changeBrand(e.target.value)}
            />
            <button onClick={e => saveBrandOnServer(e)}>save</button>
            {brand.valid === ValidationResult.ERROR && <ErrorModal error={"пошел на хуй"} />}
            {brand.serverInfo}
            
        </form>
    )
}

export default BrandModal