import { FC, FormEvent, MouseEventHandler, useContext, MouseEvent, useEffect, useState } from "react"
import AuthFormFields from "./AuthFormFields";
import { emailValidation, passwordValidation } from "../../validation/AuthValidation";
import { formView, PagesEnum, ValidationResult } from "../../enums/enums";
import { LoginActions, LoginState } from "../../App";
import { useLoginMutation, useRegistrationAdminMutation, useRegistrationMutation } from "../../store/apiSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { initialState } from "../../store/reactReducer/authFormReducer";
import React from "react";

const AuthForm = () => {

    const state = useContext(LoginState)
    const dispatch = useContext(LoginActions)

    const [login] = useLoginMutation()
    const [registration] = useRegistrationMutation()
    const [registrationAdmin] = useRegistrationAdminMutation()

    const navigate = useNavigate()
    
    const changeEmail = (e:string)  => {
        dispatch!({type:'setServerMessage', payload: ''})
        dispatch!({type:'setEmailValidationResult', payload: emailValidation(e)})
        if(state?.email.validInfo !== ValidationResult.FIRST_ADDITION) {
            dispatch!({type:"setEmail",payload: e})
            dispatch!({type:"setEmailValidationInfo", payload: emailValidation(e)})
        }
        dispatch!({type:'setEmail', payload: e})
    }

    const changePassword = (e:string) => {
        dispatch!({type:'setServerMessage', payload: ''})
        dispatch!({type:'setPasswordValidationResult', payload: passwordValidation(e)})
        if(state?.password.validInfo !== ValidationResult.FIRST_ADDITION) {
            dispatch!({type:"setPassword", payload: e})
            dispatch!({type:"setPasswordValidationInfo", payload: passwordValidation(e)})
        }
        dispatch!({type:'setPassword', payload: e})
    } 

    const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch!({
            type:"setEmailValidationInfo", 
            payload: emailValidation(state!.email.value)
        })
        dispatch!({
            type:"setPasswordValidationInfo", 
            payload: passwordValidation(state!.password.value)
        })
        if(state!.email.validResult === ValidationResult.SUCCESS &&
            state!.password.validResult ===  ValidationResult.SUCCESS   
        ) {
            switch(state!.formView) {
                case formView.FORM_LOGIN:
                    login({email: state!.email.value, password: state!.password.value})
                    .unwrap()
                    .then((res) => {
                        dispatch!({type:'reset', payload: initialState});
                        navigate(PagesEnum.SHOP)
                    })
                    .catch(e => dispatch!({type:'setServerMessage', payload: e.data.message}))
                    break;
                case formView.FORM_REGISTRATION:
                    registration({email: state!.email.value, password: state!.password.value})
                    .unwrap()
                    .then((res) => {
                        dispatch!({type:'reset', payload: initialState});
                        navigate(PagesEnum.SHOP)
                    })
                    .catch(e => dispatch!({type:'setServerMessage', payload: e.data.message}))
                    break;
                case formView.FORM_SUPER_ADMIN:
                    registrationAdmin({email: state!.email.value, password: state!.password.value})
                    .unwrap()
                    .then((res) => {
                        dispatch!({type:'superAdminReset'})
                        dispatch!({type:'setServerMessage', payload: res.message})
                    })
                    .catch(e => dispatch!({type:'setServerMessage', payload: e.data.message}))
                    break;
            }
        } 
    }

    return (
        <div>
            <AuthFormFields
                changeEmail={changeEmail}
                changePassword={changePassword}
                handleClick={handleClick}
            />
        </div>
    )
}
export default AuthForm