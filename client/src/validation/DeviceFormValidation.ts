import { Dispatch, SetStateAction } from "react"

export const deviceFormValidation = (
    str:string | number | undefined, 
    setState:Dispatch<SetStateAction<string>>) => {
    if(typeof str === "string") {
        if(!/^([a-zA-Zа-яА-Я0-9]+\s)*[a-zA-Zа-яА-Я0-9]+$/.test(str) || !str.length) {
            setState('поле должно содержать только буквы или цифры')
            return false
        } else {
            setState('')
            return true
        }
    } else {
        if(!str || typeof str !== "number") {
            setState('поле должно содержать только цифры')
            return false
        } else {
            setState('')
            return true        
        }
    }
}