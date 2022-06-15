import { Dispatch, SetStateAction } from "react"

export const emailValidation = (
    str:string, 
    setEmailError:Dispatch<SetStateAction<string>>
) => {
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
        setEmailError('необходимо заполнить почту в формате: "yourmail@mail.com"')
    } else {
        setEmailError('')
    }
}

export const passwordValidation = (
    str:string, 
    setPasswordError:Dispatch<SetStateAction<string>>
) => {
    if(!str.match(/^[A-Za-z]\w{7,14}$/)) {
        setPasswordError("пароль должен начинаться с буквы, длинна пароля должна быть от 7 до 16 букв или цифр")
    } else {
        setPasswordError('')
    }
}