import { ValidationResult } from "../../enums/enums";
import { IDeviceInfo, IDeviceModalState, IDeviceReducerActions } from "../../interface/interface";

export const init = (initialState:IDeviceModalState) => {
    return {...initialState}
}

export const initialState = {
    typeId: {value:0, valid: ValidationResult.FIRST_ADDITION},
    brandId: {value: 0, valid: ValidationResult.FIRST_ADDITION},
    name: {value: '', valid: ValidationResult.FIRST_ADDITION},
    price: {value: '', valid: ValidationResult.FIRST_ADDITION},
    image: {value:'', valid: ValidationResult.FIRST_ADDITION},
    info: [],
}

export const deviceModalReducer = (state:IDeviceModalState, action:IDeviceReducerActions) => {
    switch(action.type){
        case 'changeTypeIdValue':
            return {...state, typeId:{
                ...state.typeId,
                value: action.payload
                }
            };
        case 'changeTypeIdValid':
            return {...state, typeId:{
                ...state.typeId,
                valid: action.payload
                }
            };
        case 'changeBrandIdValue':
            return {...state, brandId:{
                ...state.brandId,
                value: action.payload, 
                }
            };
        case 'changeBrandIdValid':
            return {...state, brandId:{
                ...state.brandId,
                valid: action.payload, 
                }
            };
        case 'changeNameValue':
            return {...state, name:{
                ...state.name, 
                value: action.payload
                }
            };
        case 'changeNameValid':
            return {...state, name:{ 
                ...state.name,
                valid: action.payload
                }
            };
        case 'changePrice':
            return {...state, price:{
                value: action.payload.value, 
                valid: action.payload.valid
                }
            };
        case 'selectImage':
            return {...state, image:{
                value: action.payload.value, 
                valid: action.payload.valid
                }
            };
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
        case 'reset':
            return init(action.payload)  
    }
}