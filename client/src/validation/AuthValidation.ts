import { ValidationResult } from "../enum/enum"

export const emailValidation = (str:string) => {
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
        return ValidationResult.error
    } else {
        return ValidationResult.success
    }
}

export const passwordValidation = (str:string) => {
    if(!str.match(/^[A-Za-z]\w{7,14}$/)) {
        return ValidationResult.error
    } else {
        return ValidationResult.success
    }
}