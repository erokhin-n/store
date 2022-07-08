import { FC } from "react"
import { IImageInput } from "../../../interface/interface"

const ImageInput:FC<IImageInput> = ({changeValue}) => {
    return (
        <div>
            <label>изображение</label>
            <input 
                type="file"
                onChange={e => changeValue(e)}
            />
        </div>
    )
}

export default ImageInput