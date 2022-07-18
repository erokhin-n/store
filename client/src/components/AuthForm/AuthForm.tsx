import { FC, FormEvent, MouseEventHandler, useContext, useEffect, useState } from "react"
import AuthFormFields from "./AuthFormFields";
import { emailValidation, passwordValidation } from "../../validation/AuthValidation";
import { formView } from "../../enum/enum";
import { LoginActions, LoginState } from "../../pages/Login";

const AuthForm = () => {

    const state = useContext(LoginState)
    const dispatch = useContext(LoginActions)

    const handleClick:MouseEventHandler<HTMLElement> = (e) => {
        e.stopPropagation()
        dispatch!({type:'setHideValidationError', payload:false})
    }

    // if(state!.formView !== formView.login && state!.formView !== formView.registration) {
    //     dispatch!({type:'setFormView', payload: formView.super_admin})
    // }

    console.log(state)
    
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