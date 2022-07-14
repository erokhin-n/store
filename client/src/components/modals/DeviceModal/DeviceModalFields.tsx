import { useContext, MouseEvent, FC } from "react"
import { ValidationResult } from "../../../enum/enum"
import { IDeviceFormFields } from "../../../interface/interface"
import { initialState } from "../../../store/reactReducer/deviceModalReducer"
import BrandIdSelect from "../../UI/BrandIdSelect"
import ImageInput from "../../UI/ImageInput"
import NameInput from "../../UI/NameInput"
import PriceInput from "../../UI/PriceInput"
import TypeIdSelect from "../../UI/TypeIdSelect"
import DeviceInfo from "./DeviceInfo"
import { DeviceModalDispatch, DeviceModalState } from "./DeviceModal"

const DeviceModalFields:FC<IDeviceFormFields> = ({sendDeviceForm}) => {

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

        state!.info.map(i => (i.titleValid === ValidationResult.firstAddition) && 
            dispatch!({type:'changeTitle', payload: {value: '', id:i.id, valid:ValidationResult.error}}))

        state!.info.map(i => (i.descriptionValid === ValidationResult.firstAddition) && 
            dispatch!({type:'changeDescription', payload: {value: '', id:i.id, valid:ValidationResult.error}}))
        
    }
  
    const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        checkFielsBeforeSend()

        const modalValid = [state!.typeId.valid, state!.brandId.valid,
            state!.name.valid, state!.price.valid,state!.image.valid ].findIndex(
                element => element !== ValidationResult.success)

        const infoTitleValid = state!.info.findIndex(i => i.titleValid !== ValidationResult.success)
        const infoDescriptionValid = state!.info.findIndex(i => i.descriptionValid !== ValidationResult.success)
        
        if((modalValid === -1 &&  infoTitleValid === -1 && infoDescriptionValid === -1 )) {
            sendDeviceForm() 
            dispatch!({type:'reset', payload: initialState}) 
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
            <button onClick={e => handleClick(e)}>сохранить устройство</button>
        </div>
    )
}

export default DeviceModalFields