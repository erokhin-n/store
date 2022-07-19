import { Dispatch, SetStateAction } from "react"
import { ValidationResult } from "../enums/enums"

export const deviceFormValidation = (
    str:string | number | undefined) => {
    if(typeof str === "string") {
        if(!/^([a-zA-Zа-яА-Я0-9]+\s)*[a-zA-Zа-яА-Я0-9]+$/.test(str) || !str.length) {
            return ValidationResult.ERROR
        } else {
            return ValidationResult.SUCCESS  
        }
    } else {
        if(!str || typeof str !== "number") {
            return ValidationResult.ERROR
        } else {
            return ValidationResult.SUCCESS       
        }
    }
}

export const priceFormValidation = (str:string) => {
    if(!/^(?:[1-9]\d*|0(?!(?:\.0+)?$))?(?:\.\d+)?$/.test(str) || !str.length) {
        return ValidationResult.ERROR
    } else {
        return ValidationResult.SUCCESS 
    }
}

export const deviceInfoValidation = (str:string) => {
    if(/^([a-zA-Zа-яА-Я0-9]+\s)*[a-zA-Zа-яА-Я0-9]+$/.test(str)){
        return ValidationResult.SUCCESS
    } else {
        return ValidationResult.ERROR
    }
}

export const deviceImageValidation = (file:string | Blob) => {
    if(file) {
        return ValidationResult.SUCCESS
    } else {
        return ValidationResult.ERROR
    }
}