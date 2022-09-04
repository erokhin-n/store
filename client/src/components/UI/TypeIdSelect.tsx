import {  useContext } from "react"
import { ValidationResult } from "../../enums/enums"
import { ITypeAndBrand } from "../../interface/interface"
import { useGetAllTypesQuery } from "../../store/apiSlice/typeSlice"
import { deviceFormValidation } from "../../validation/DeviceFormValidation"
import { DeviceModalDispatch, DeviceModalState } from "../modals/DeviceModal/DeviceModal"

const TypeIdSelect = () => {

    const {data:types} = useGetAllTypesQuery()

    const state = useContext(DeviceModalState)
    const dispatch = useContext(DeviceModalDispatch)

    const changeValue = (id:number) => {
        dispatch!({type:"changeTypeId", payload:{value:id, valid: deviceFormValidation(id)}}) 
    }

    return (
        <div>
            <select 
                style={{
                    border: (state!.typeId.valid === ValidationResult.ERROR) ? 
                    "3px solid red" : "1px solid black"
                }}
            >
            <option onClick={() => changeValue(0)}>{"выберите тип"}</option>
            {types && types.map((type:ITypeAndBrand) => 
                <option
                    key={type.id} 
                    value={state!.typeId.value}
                    onClick={() => changeValue(type.id!)}
                >
                    {type.name}
                </option>    
            )}
        </select>
        {state!.typeId.valid === ValidationResult.ERROR && <h4>нужно выбрать тип</h4>}
    </div>
    )
}

export default TypeIdSelect