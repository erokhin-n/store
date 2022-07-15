import { FC, useContext, MouseEvent } from "react"
import { Link } from "react-router-dom"
import { EnumRoute, formView, ValidationResult } from "../../enum/enum"
import {  IAuthFormFields } from "../../interface/interface"
import ErrorModal from "../ErrorModal"
import { emailValidation, passwordValidation } from "../../validation/AuthValidation"
import style from './AuthFormFields.module.css'
import { LoginActions, LoginState } from "../../pages/Login"

const AuthFormFields:FC<IAuthFormFields>=({sendForm,  
    authFormStates, 
    loginInformation, 
    adminRegStates, }) => {

    const state = useContext(LoginState)
    const dispatch = useContext(LoginActions)

    const changeEmail = (e:string)  => {
        if(state?.email.valid === ValidationResult.error) {
            dispatch!({type:"setEmailValueAndValidation",
                payload: {value: e,valid:emailValidation(e)}
            })
        }
        // if(adminRegStates!.setAdminRegMessage) adminRegStates!.setAdminRegMessage('')
        // authFormStates.setServerError('')
        // authFormStates.setSubmitError('')
        // authFormStates.setEmail(e)
        dispatch!({type:'setEmail', payload: e})
        
    }

    const changePassword = (e:string) => {
        if(state?.password.valid === ValidationResult.error) {
            dispatch!({type:"setPasswordValueAndValidation",
                payload: {value: e,valid:passwordValidation(e)}
            })
        }
        // if(adminRegStates!.setAdminRegMessage) adminRegStates!.setAdminRegMessage('')
        // authFormStates.setServerError('')
        // authFormStates.setSubmitError('')
        // authFormStates.setEmail(e)
        dispatch!({type:'setPassword', payload: e})
    } 

    const sendFormOnServer = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log("email " + state!.email.valid)
        console.log("password " + state!.password.valid)
        dispatch!({
            type:"setEmailValidation", 
            payload: emailValidation(state!.email.value)
        })
        dispatch!({
            type:"setPasswordValidation", 
            payload: passwordValidation(state!.password.value)
        })
    }

    return (
        <form 
            className={"authForm"}
        >
            <input 
                type="text" 
                placeholder="введите почту"
                className={state!.email.valid === ValidationResult.error ? 
                    [style.inputError, style.input].join(' ') : 
                    style.input}
                value={state?.email.value}
                onChange={e => changeEmail(e.target.value)}
                // onBlur={() => emailValidation(authFormStates.email, authFormStates.setEmailError)}
            />
            {authFormStates.emailError && <ErrorModal error={authFormStates.emailError} />}
            <input
                type="text"
                placeholder="введите пароль"
                className={state!.password.valid === ValidationResult.error ? 
                    [style.inputError, style.input].join(' ') : 
                    style.input}
                value={state!.password.value}
                onChange={e => changePassword(e.target.value)}
                // onBlur={() =>  passwordValidation(authFormStates.password, authFormStates.setPasswordError)}
            />
            {authFormStates.passwordError && <ErrorModal error={authFormStates.passwordError} />}
            {authFormStates.submitError && <ErrorModal error={authFormStates.submitError} /> }
            {authFormStates.serverError && 
                <ErrorModal 
                    error={authFormStates.serverError
                        .split(":")[1]
                        .replace(/[\\\}]/gi, '')
                    } 
                />
            }
            {adminRegStates!.adminRegMessage}
            <button 
                className="authFormButton"
                onClick={ e =>  sendFormOnServer(e)}
            >
                {loginInformation === formView.super_admin ? 
                    'регистрация админа' : 
                    loginInformation === formView.login ?
                    "войти" : "регистрация"
                }
            </button>
            {loginInformation === formView.super_admin ?
                null :
                (loginInformation === formView.login) ?
                <div>
                    Нет аккаунта? <Link to={EnumRoute.Registration}>Зарегистрируйся</Link>
                </div>
                :
                <div>
                    есть аккаунт? <Link to={EnumRoute.Login}>Войдите</Link>
                </div>    
            }
        </form>
    )
} 

export default AuthFormFields