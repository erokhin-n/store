import { Dispatch, SetStateAction } from "react"

export const useFormValidation = (
    str:string, 
    setState:Dispatch<SetStateAction<string>>) => {
    if(!/^[A-Za-zА-Яа-я0-9]*$/.test(str) || !str.length) {
        setState('поле необходимо исправить')
    } else {
        setState('')
    }
}