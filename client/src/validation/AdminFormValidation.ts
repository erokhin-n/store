import { Dispatch, SetStateAction } from "react"

export const adminFormValidation = (
    str:string, 
    setState:Dispatch<SetStateAction<string>>) => {
    if(!/^[A-Za-zА-Яа-я0-9]*$/.test(str) || !str.length) {
        setState('поле должно содержать только буквы или цифры')
        return false
    } else {
        setState('')
        return true
    }
}