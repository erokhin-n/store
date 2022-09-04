import { FC, useContext } from "react"
import { ValidationResult } from "../../enums/enums"
import { useGetAllBrandsQuery } from "../../store/apiSlice/brandSlice"
import { deviceFormValidation } from "../../validation/DeviceFormValidation"
import ErrorModal from "../ErrorModal"
import { DeviceModalDispatch, DeviceModalState } from "../modals/DeviceModal/DeviceModal"

const BrandIdSelect = () => {

    const {data:brands} = useGetAllBrandsQuery()

    const state = useContext(DeviceModalState)
    const dispatch = useContext(DeviceModalDispatch)

    const changeValue = (id:number) => {
        dispatch!({type:"changeBrandId", payload:{value: id, valid: deviceFormValidation(id)}}) 
    }

    return (
        <div>
            <select 
                style={{
                    border: (state!.brandId.valid === ValidationResult.ERROR) ? 
                    "3px solid red" : "1px solid black"
                }}
                data-testid="select"
            >
            <option onClick={() => changeValue(0)}>{"выберите бренд"}</option>
            {brands && brands.map(brand => 
                <option
                    key={brand.id} 
                    value={state!.brandId.value}
                    onClick={() => changeValue(brand.id!)}
                >
                    <h4>{brand.name}</h4>
                </option>    
            )}
        </select>
    </div>
    )
}

export default BrandIdSelect