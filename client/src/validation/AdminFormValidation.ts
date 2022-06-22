import { Dispatch, SetStateAction } from "react"

export const adminFormValidation = (
    str:string, 
    setState:Dispatch<SetStateAction<string>>) => {
    if(!/^[A-Za-zА-Яа-я0-9]*$/.test(str) || !str.length) {
        setState('исправьте это поле!')
    } else {
        setState('')
    }
}