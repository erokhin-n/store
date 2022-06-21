import { ChangeEventHandler, FormEvent, useState } from "react"
import { useSaveBrandMutation } from "../store/apiSlice/deviceSlice"

const BrandModal = () => {

    const [brand, setBrand] = useState<string>('')

    const [saveBrand, {isLoading}] = useSaveBrandMutation() 

    const saveBrandOnServer:ChangeEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        saveBrand({name: brand})
    }

    if (isLoading) {
        return <h3>brand loading ....</h3>
    }

    return (
        <form
            onSubmit={saveBrandOnServer}
        >
            <input 
                type = "text"
                placeholder="название бренда"
                value={brand}  
                onChange={e => setBrand(e.target.value)}
            />
            <button>save</button>
        </form>
    )
}

export default BrandModal