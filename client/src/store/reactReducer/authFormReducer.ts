import { formView, ValidationResult } from "../../enums/enums";
import { IAuthFormActions, IAuthFormState } from "../../interface/interface"

export const init = (initialState:IAuthFormState) => {
    return {...initialState}
}

export const initialState = {
    formView: formView.login,
    serverErrorMessage: '',
    hideValidationError: false,
    adminRegMessage: '',
    email: {value: '', validInfo:ValidationResult.FIRST_ADDITION, validResult: ValidationResult.FIRST_ADDITION},
    password: {value: '', validInfo:ValidationResult.FIRST_ADDITION,validResult: ValidationResult.FIRST_ADDITION},
}

export const authFormReducer = (state:IAuthFormState, action:IAuthFormActions) => {
    switch(action.type){
        case 'setFormView':
            return {...state, formView: action.payload}
        case 'setHideValidationError':
            return {...state, hideValidationError: action.payload}
        case 'setEmail':
            return {...state, email: {...state.email, value: action.payload}}
        case 'setEmailValidationInfo':
            return {...state, email: {...state.email, validInfo: action.payload}}
        case 'setEmailValidationResult':
            return {...state, email: {...state.email, validResult: action.payload}}
        case 'setPassword':
            return {...state, password: {...state.password, value: action.payload}}
        case 'setPasswordValidationInfo':
            return {...state, password: {...state.password, validInfo: action.payload}}
        case 'setPasswordValidationResult':
            return {...state, password: {...state.password, validResult: action.payload}}
        case 'reset':
            return init(initialState)
        case 'superAdminReset':
            return {...state, 
                email: {value: '', validInfo:ValidationResult.FIRST_ADDITION,
                    validResult: ValidationResult.FIRST_ADDITION
                },
                password: {value: '', validInfo:ValidationResult.FIRST_ADDITION, 
                    validResult: ValidationResult.FIRST_ADDITION
                } 
            }
    }
}