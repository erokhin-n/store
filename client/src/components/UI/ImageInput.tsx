import { ChangeEvent, FC, useContext } from "react"
import { ValidationResult } from "../../enums/enums"
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
                placeholder="добавьте изображение"
                style={{background: (state!.image.valid === ValidationResult.ERROR) ?
                    "red" : "white"
                }}
                type="file"
                onChange={e => selectImage(e)}
            />
            {state!.image.valid === ValidationResult.ERROR &&
                <h4>добавьте изображение</h4> }
        </div>
    )
}

export default ImageInput