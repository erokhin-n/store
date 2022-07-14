import { ValidationResult } from "../../enum/enum";
import { IDeviceInfo, IDeviceModalState, IDeviceReducerActions } from "../../interface/interface";

export const init = (initialState:any) => {
    return {...initialState}
}

export const initialState = {
    typeId: {value:0, valid: ValidationResult.firstAddition},
    brandId: {value: 0, valid: ValidationResult.firstAddition},
    name: {value: '', valid: ValidationResult.firstAddition},
    price: {value: '', valid: ValidationResult.firstAddition},
    image: {value:'', valid: ValidationResult.firstAddition},
    info: [],
}

export const deviceModalReducer = (state:IDeviceModalState, action:IDeviceReducerActions) => {
    switch(action.type){
        case 'changeTypeId':
            return {...state, typeId:{
                value: action.payload.value, 
                valid: action.payload.valid
                }
            };
        case 'changeBrandId':
            return {...state, brandId:{
                value: action.payload.value, 
                valid: action.payload.valid
                }
            };
        case 'changeName':
            return {...state, name:{
                value: action.payload.value, 
                valid: action.payload.valid
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