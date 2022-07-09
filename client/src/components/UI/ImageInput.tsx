import { ChangeEvent, FC } from "react"
import { ValidationResult } from "../../enum/enum"
import { IImageInput } from "../../interface/interface"
import { deviceImageValidation } from "../../validation/DeviceFormValidation"

const ImageInput:FC<IImageInput> = ({image,setValue}) => {

    const selectImage = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) setValue({file:e.target.files[0],
            valid:deviceImageValidation(e.target.files[0])}) 
    }  

    return (
        <div>
            <label>изображение</label>
            <input 
                style={{background: (image.valid === ValidationResult.error) ?
                    "red" : "white"
                }}
                type="file"
                onChange={e => selectImage(e)}
            />
        </div>
    )
}

export default ImageInput