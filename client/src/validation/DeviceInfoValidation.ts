import { ValidationResult } from "../enum/enum"

export const deviceInfoValidation = (str:string) => {
    if(/^([a-zA-Zа-яА-Я0-9]+\s)*[a-zA-Zа-яА-Я0-9]+$/.test(str)){
        return ValidationResult.success
    } else {
        return ValidationResult.error
    }
}
