import { ChangeEvent, FC, useContext } from "react"
import { ValidationResult } from "../../enum/enum"
import { IImageInput } from "../../interface/interface"
import { deviceImageValidation } from "../../validation/DeviceFormValidation"
import { DeviceModalDispatch, DeviceModalState } from "../modals/DeviceModal/DeviceModal"

const ImageInput = () => {

    const state = useContext(DeviceModalState)
    const dispatch = useContext(DeviceModalDispatch)

    const selectImage = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            dispatch!({type:'selectImage', payload:{
                value:e.target.files[0], 
                valid:deviceImageValidation(e.target.files[0])}})
        }
    }  

    return (
        <div>
            <label>изображение</label>
            <input 
                style={{background: (state!.image.valid === ValidationResult.error) ?
                    "red" : "white"
                }}
                type="file"
                onChange={e => selectImage(e)}
            />
        </div>
    )
}

export default ImageInput