import { FC } from "react"
import { ValidationResult } from "../../enum/enum"
import { IImageInput } from "../../interface/interface"

const ImageInput:FC<IImageInput> = ({image,changeValue}) => {
    return (
        <div>
            <label>изображение</label>
            <input 
                style={{background: (image.valid === ValidationResult.error) ?
                    "red" : "white"
                }}
                type="file"
                onChange={e => changeValue(e)}
            />
        </div>
    )
}

export default ImageInput