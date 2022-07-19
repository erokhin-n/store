import { ValidationResult } from "../enums/enums"

export const emailValidation = (str:string) => {
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
        return ValidationResult.ERROR
    } else {
        return ValidationResult.SUCCESS
    }
}

export const passwordValidation = (str:string) => {
    if(!str.match(/^[A-Za-z]\w{7,14}$/)) {
        return ValidationResult.ERROR
    } else {
        return ValidationResult.SUCCESS
    }
}