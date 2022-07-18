import { formView, ValidationResult } from "../../enum/enum";
import { IAuthFormActions, IAuthFormState } from "../../interface/interface"

export const initialState = {
    formView: formView.login,
    serverErrorMessage: '',
    hideValidationError: false,
    adminRegMessage: '',
    email: {value: '', valid:ValidationResult.firstAddition},
    password: {value: '', valid:ValidationResult.firstAddition},
}

export const authFormReducer = (state:IAuthFormState, action:IAuthFormActions) => {
    switch(action.type){
        case 'setPageView':
            return {...state, pageView: action.payload}
        case 'setHideValidationError':
            return {...state, hideValidationError: action.payload}
        case 'setEmail':
            return {...state, email: {...state.email, value: action.payload}}
        case 'setEmailValidation':
            return {...state, email: {...state.email, valid: action.payload}}
        case 'setEmailValueAndValidation':
            return {...state, email: {value: action.payload.valid, valid: action.payload.valid}}
        case 'setPassword':
            return {...state, password: {...state.password, value: action.payload}}
        case 'setPasswordValidation':
            return {...state, password: {...state.password, valid: action.payload}}
        case 'setPasswordValueAndValidation':
            return {...state, password: {value: action.payload.valid, valid: action.payload.valid}}
        case 'setFormView':
            return {...state, formView: action.payload}
    }
}