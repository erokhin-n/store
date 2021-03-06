import { FC, useContext } from "react"
import { ValidationResult } from "../../enum/enum"
import { ISelect } from "../../interface/interface"
import { useGetAllBrandsQuery } from "../../store/apiSlice/brandSlice"
import { deviceFormValidation } from "../../validation/DeviceFormValidation"
import ErrorModal from "../ErrorModal"
import { DeviceModalDispatch, DeviceModalState } from "../modals/DeviceModal/DeviceModal"

const BrandIdSelect = () => {

    const {data:brands} = useGetAllBrandsQuery()

    const state:any = useContext(DeviceModalState)
    const dispatch:any = useContext(DeviceModalDispatch)

    const changeValue = (id:number) => {
        dispatch({type:"changeBrandId", payload:id})
        dispatch({type:"setBrandIdValid", payload: deviceFormValidation(id) })  
    }

    return (
        <div>
            <select 
                style={{
                    border: (state.brandIdValid === ValidationResult.error) ? 
                    "3px solid red" : "1px solid black"
                }}
            >
            <option onClick={() => changeValue(0)}>{"выберите бренд"}</option>
            {brands && brands.map((brand:any) => 
                <option
                    key={brand.id} 
                    value={state.brandId}
                    onClick={() => changeValue(brand.id)}
                >
                    {brand.name}
                </option>    
            )}
        </select>
    </div>
    )
}

export default BrandIdSelect