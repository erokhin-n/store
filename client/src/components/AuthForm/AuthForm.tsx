import { FC, FormEvent, MouseEventHandler, useContext, useEffect, useState } from "react"
import AuthFormFields from "./AuthFormFields";
import { emailValidation, passwordValidation } from "../../validation/AuthValidation";
import { formView } from "../../enum/enum";
import { LoginActions, LoginState } from "../../App";

const AuthForm = () => {

    const state = useContext(LoginState)
    const dispatch = useContext(LoginActions)

    const handleClick:MouseEventHandler<HTMLElement> = (e) => {
        e.stopPropagation()
        dispatch!({type:'setHideValidationError', payload:false})
    }
    
    return (
        <div onClick={handleClick} style={{
            background: 'lightgray', 
            maxWidth: '400px', 
            margin:'auto'
        }}>
            <AuthFormFields />
        </div>
    )
}
export default AuthForm