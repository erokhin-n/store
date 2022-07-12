import {  useContext } from "react"
import { ValidationResult } from "../../enum/enum"
import { useGetAllTypesQuery } from "../../store/apiSlice/typeSlice"
import { deviceFormValidation } from "../../validation/DeviceFormValidation"
import { DeviceModalDispatch, DeviceModalState } from "../modals/DeviceModal/DeviceModal"

const TypeIdSelect = () => {

    const {data:types} = useGetAllTypesQuery()

    const state:any = useContext(DeviceModalState)
    const dispatch:any = useContext(DeviceModalDispatch)

    const changeValue = (id:number) => {
        dispatch({type:"changeTypeId", payload:id})
        dispatch({type:"setTypeIdValid", payload: deviceFormValidation(id) })  
    }

    return (
        <div>
            <select 
                style={{
                    border: (state.typeIdError === ValidationResult.error) ? 
                    "3px solid red" : "1px solid black"
                }}
            >
            <option onClick={() => changeValue(0)}>{"выберите тип"}</option>
            {types && types.map((type:any) => 
                <option
                    key={type.id} 
                    value={state.typeId}
                    onClick={() => changeValue(type.id)}
                >
                    {type.name}
                </option>    
            )}
        </select>
    </div>
    )
}

export default TypeIdSelect