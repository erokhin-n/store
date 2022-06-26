import { FC } from "react"
import { ITypeAndBrand } from "../../../interface/interface"

const DeviceModal
:FC<{types:ITypeAndBrand[] | undefined, brands: ITypeAndBrand[] | undefined}> = 
({types, brands}) => {
    return (
        <div>
            <form>
                <select>
                    {types && types.map(type => 
                        <option
                            key={type.id} 
                            value={type.name}
                        >
                            {type.name}
                        </option>    
                    )}
                </select>
                <select>
                    {brands && brands.map(brand => 
                        <option
                            key={brand.id} 
                            value={brand.name}
                        >
                            {brand.name}
                        </option>    
                    )}
                </select>
            </form>
        </div>
    )
}

export default DeviceModal