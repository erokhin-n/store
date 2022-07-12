import { ValidationResult } from "../../enum/enum";
import { IDevice, IDeviceInfo } from "../../interface/interface";

export const initialState:any = {
    typeId: 0,
    typeIdValid: ValidationResult.firstAddition,
    brandId: 0,
    brandIdValid: ValidationResult.firstAddition,
    name: '',
    nameValid: ValidationResult.firstAddition,
    price: '',
    priceValid: ValidationResult.firstAddition,
    image: '',
    imageValid: ValidationResult.firstAddition,
    info: [],
    deviceFormError:'',
}

export const deviceModalReducer:any = (state:any, action:any) => {
    switch(action.type){
        case 'changeTypeId':
            return {...state, typeId: action.payload};
        case 'setTypeIdValid':
            return {...state, typeIdValid: action.payload};
        case 'changeBrandId':
            return {...state, brandId: action.payload};
        case 'setBrandIdValid':
            return {...state, brandIdValid: action.payload};
        case 'changeName':
            return {...state, name: action.payload};
        case 'setNameValid':
            return {...state, nameValid: action.payload};
        case 'changePrice':
            return {...state, price: action.payload};
        case 'setPriceValid':
            return {...state, priceValid: action.payload};
        case 'selectImage':
            return {...state, image: action.payload};
        case 'setImageValid':
                return {...state, imageValid: action.payload};
        case 'addInfo':
            return {...state, info: action.payload};
        case 'changeTitle':
            return {...state, info: state.info.map((i:IDeviceInfo) =>  
                i.id === action.payload.id ? 
                {...i, title: action.payload.value, titleValid: action.payload.valid} : i    
            )}
        case 'changeDescription':
            return {...state, info: state.info.map((i:IDeviceInfo) =>  
                i.id === action.payload.id ? 
                {...i, description: action.payload.value, descriptionValid: action.payload.valid } : i    
            )}
        case 'removeInfo':
            return {...state, info: state.info.filter((i:IDeviceInfo) => 
                i.id !== action.payload)
            }
    }
}