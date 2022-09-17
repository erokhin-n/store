import { ChangeEvent, createRef, FC, RefObject, useContext } from "react"
import { ValidationResult } from "../../enums/enums"
import { deviceImageValidation } from "../../validation/DeviceFormValidation"
import { DeviceModalDispatch, DeviceModalState } from "../modals/DeviceModal/DeviceModal"

const ImageInput = () => {

    const state = useContext(DeviceModalState)
    const dispatch = useContext(DeviceModalDispatch)

    const fileInput:RefObject<HTMLInputElement> = createRef()

    const selectImage = () => {
        if(fileInput!.current!.files![0]) {
            dispatch!({type:'selectImage', payload:{
                value:fileInput!.current!.files![0], 
                valid:deviceImageValidation(fileInput!.current!.files![0])}})
        }
    } 
    
    const deleteImage = () => {
        fileInput!.current!.value = ''
        dispatch!({type:'selectImage', payload: {value: '', valid: ValidationResult.FIRST_ADDITION}})
    }

    return (
        <div>
            <label htmlFor="file-uploader">изображение</label>
            <input 
                placeholder="добавьте изображение"
                style={{background: (state!.image.valid === ValidationResult.ERROR) ?
                    "red" : "white"
                }}
                type="file"
                id="file-uploader"
                ref={fileInput}
                onChange={() => selectImage()}
            />
            <button onClick={deleteImage} >X</button>
            {state!.image.valid === ValidationResult.ERROR &&
                <h4>добавьте изображение</h4> }
        </div>
    )
}

export default ImageInput