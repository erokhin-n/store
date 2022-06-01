import { useState } from "react"
import { useSaveBrandMutation } from "../store/apiSlice"

const BrandModal = () => {

    const [brand, setBrand] = useState<string | undefined>('')

    const [saveBrand, {isLoading}] = useSaveBrandMutation() 

    const saveBrandOnServer = (e:any) => {
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