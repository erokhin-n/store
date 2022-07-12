import { ChangeEvent, FC, useContext } from "react"
import { ValidationResult } from "../../enum/enum"
import { IImageInput } from "../../interface/interface"
import { deviceImageValidation } from "../../validation/DeviceFormValidation"
import { DeviceModalDispatch, DeviceModalState } from "../modals/DeviceModal/DeviceModal"

const ImageInput = () => {

    const state:any = useContext(DeviceModalState)
    const dispatch:any = useContext(DeviceModalDispatch)

    const selectImage = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            dispatch({type:'selectImage', payload:e.target.files[0]})
            dispatch({type: 'setImageValid', payload:deviceImageValidation(e.target.files[0])})}
    }  

    return (
        <div>
            <label>изображение</label>
            <input 
                style={{background: (state.image.valid === ValidationResult.error) ?
                    "red" : "white"
                }}
                type="file"
                onChange={e => selectImage(e)}
            />
        </div>
    )
}

export default ImageInput