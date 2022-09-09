import { useContext, MouseEvent, FC } from "react"
import { ValidationResult } from "../../../enums/enums"
import { IDeviceFormFields } from "../../../interface/interface"
import { initialState } from "../../../store/reactReducer/deviceModalReducer"
import { deviceFormValidation } from "../../../validation/DeviceFormValidation"
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

    const checkFieldsBeforeSend = () => { 
        dispatch!({type:'changeTypeId', payload:{value: state!.typeId.value, valid: deviceFormValidation(state!.typeId.value)}});

        (state!.brandId.valid === ValidationResult.FIRST_ADDITION) && 
            dispatch!({type:'changeBrandId', payload:{value: 0, valid: ValidationResult.ERROR}});

        (state!.name.valid === ValidationResult.FIRST_ADDITION) && 
            dispatch!({type:'changeName', payload:{value: '', valid: ValidationResult.ERROR}});

        (state!.price.valid === ValidationResult.FIRST_ADDITION) && 
            dispatch!({type:'changePrice', payload:{value: '', valid: ValidationResult.ERROR}});

        (state!.image.valid === ValidationResult.FIRST_ADDITION) && 
            dispatch!({type:'selectImage', payload:{value: '', valid: ValidationResult.ERROR}});

        state!.info.map(i => (i.titleValid === ValidationResult.FIRST_ADDITION) && 
            dispatch!({type:'changeTitle', payload: {value: '', id:i.id, valid:ValidationResult.ERROR}}))

        state!.info.map(i => (i.descriptionValid === ValidationResult.FIRST_ADDITION) && 
            dispatch!({type:'changeDescription', payload: {value: '', id:i.id, valid:ValidationResult.ERROR}}))
        
    }
  
    const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        checkFieldsBeforeSend()

        const modalValid = [state!.typeId.valid, state!.brandId.valid,
            state!.name.valid, state!.price.valid,state!.image.valid ].findIndex(
                element => element !== ValidationResult.SUCCESS)

        const infoTitleValid = state!.info.findIndex(i => i.titleValid !== ValidationResult.SUCCESS)
        const infoDescriptionValid = state!.info.findIndex(i => i.descriptionValid !== ValidationResult.SUCCESS)
        
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