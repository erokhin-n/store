import { Dispatch, SetStateAction } from "react"
import { ValidationResult } from "../enum/enum"

export const deviceFormValidation = (
    str:string | number | undefined) => {
    if(typeof str === "string") {
        if(!/^([a-zA-Zа-яА-Я0-9]+\s)*[a-zA-Zа-яА-Я0-9]+$/.test(str) || !str.length) {
            return ValidationResult.error
        } else {
            return ValidationResult.success  
        }
    } else {
        if(!str || typeof str !== "number") {
            return ValidationResult.error
        } else {
            return ValidationResult.success       
        }
    }
}

export const priceFormValidation = (str:string) => {
    if(!/^(?:[1-9]\d*|0(?!(?:\.0+)?$))?(?:\.\d+)?$/.test(str)) {
        return ValidationResult.error
    } else {
        return ValidationResult.success 
    }
}