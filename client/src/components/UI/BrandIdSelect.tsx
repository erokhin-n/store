import { ChangeEvent, FC, useContext } from "react"
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
                data-testid="BrandSelect"
                onChange={(e:ChangeEvent<HTMLSelectElement>)=> changeValue(Number(e.target.value))}
                value={state?.brandId.value}
            >
            <option value={0}>{"выберите бренд"}</option>
            {brands && brands.map(brand => 
                <option
                    key={brand.id} 
                    value={brand.id}
                >
                    {brand.name}
                </option>    
            )}
            </select>
        {state?.brandId.valid === ValidationResult.ERROR && <h4>нужно выбрать бренд</h4>}
        </div>
    )
}

export default BrandIdSelect