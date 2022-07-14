import { useContext, MouseEvent } from "react"
import { ValidationResult } from "../../../enum/enum"
import BrandIdSelect from "../../UI/BrandIdSelect"
import ImageInput from "../../UI/ImageInput"
import NameInput from "../../UI/NameInput"
import PriceInput from "../../UI/PriceInput"
import TypeIdSelect from "../../UI/TypeIdSelect"
import DeviceInfo from "./DeviceInfo"
import { DeviceModalDispatch, DeviceModalState } from "./DeviceModal"

const DeviceModalFields = () => {

    const state = useContext(DeviceModalState)
    const dispatch = useContext(DeviceModalDispatch)

    const checkFielsBeforeSend = () => {
        (state!.typeId.valid === ValidationResult.firstAddition) && 
            dispatch!({type:'changeTypeId', payload:{value: 0, valid: ValidationResult.error}});

        (state!.brandId.valid === ValidationResult.firstAddition) && 
            dispatch!({type:'changeBrandId', payload:{value: 0, valid: ValidationResult.error}});

        (state!.name.valid === ValidationResult.firstAddition) && 
            dispatch!({type:'changeName', payload:{value: '', valid: ValidationResult.error}});

        (state!.price.valid === ValidationResult.firstAddition) && 
            dispatch!({type:'changePrice', payload:{value: '', valid: ValidationResult.error}});

        (state!.image.valid === ValidationResult.firstAddition) && 
            dispatch!({type:'selectImage', payload:{value: '', valid: ValidationResult.error}});

        
        
    }
  
    const testClick = (e:MouseEvent<HTMLButtonElement>) => {

        checkFielsBeforeSend()

        const val = [
            state!.typeId.valid, 
            state!.brandId.valid,
            state!.name.valid, 
            state!.price.valid,
            state!.image.valid 
           ].findIndex(val => 
                val !== ValidationResult.success
            )
        
        if(val === -1) {
            console.log('send')
        } else {
            console.log('dont send')
        }
        
    }

    
    return (
        <div>
            <TypeIdSelect />
            <BrandIdSelect />
            <NameInput />
            <PriceInput />
            <ImageInput/>
            <DeviceInfo />
            <button onClick={e => testClick(e)}>сохранить устройство</button>
        </div>
    )
}

export default DeviceModalFields