import { FC } from "react"
import { Link } from "react-router-dom"
import { EnumRoute } from "../../enum/enum"
import {  IAuthFormFields } from "../../interface/interface"
import ErrorModal from "../ErrorModal"
import { emailValidation, passwordValidation } from "../../validation/AuthValidation"
import style from './AuthFormFields.module.css'

const AuthFormFields:FC<IAuthFormFields>=({sendForm,  
    authFormStates, 
    loginInformation, 
    adminRegStates, }) => {

    const changeEmail = (e:string)  => {
        if(authFormStates.emailError) emailValidation(e, authFormStates.setEmailError)
        if(adminRegStates!.setAdminRegMessage) adminRegStates!.setAdminRegMessage('')
        authFormStates.setServerError('')
        authFormStates.setSubmitError('')
        authFormStates.setEmail(e)
    }

    const changePassword = (e:string) => {
        console.log(loginInformation)
        if(authFormStates.passwordError) passwordValidation(e, authFormStates.setPasswordError)
        if(adminRegStates!.setAdminRegMessage) adminRegStates!.setAdminRegMessage('')
        authFormStates.setServerError('')
        authFormStates.setSubmitError('')
        authFormStates.setPassword(e)
    } 

    return (
        <form 
            className={"authForm"}
        >
            <input 
                type="text" 
                placeholder="введите почту"
                className={authFormStates.emailError ? 
                    [style.inputError, style.input].join(' ') : 
                    style.input}
                value={authFormStates.email}
                onChange={e => changeEmail(e.target.value)}
                onBlur={() => emailValidation(authFormStates.email, authFormStates.setEmailError)}
            />
            {authFormStates.emailError && <ErrorModal error={authFormStates.emailError} />}
            <input
                type="text"
                placeholder="введите пароль"
                className={authFormStates.passwordError ? 
                    [style.inputError, style.input].join(' ') : 
                    style.input}
                value={authFormStates.password}
                onChange={e => changePassword(e.target.value)}
                onBlur={() =>  passwordValidation(authFormStates.password, authFormStates.setPasswordError)}
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
                onClick={ e =>  sendForm(e)}
            >
                {loginInformation === "super_admin" ? 
                    'регистрация админа' : 
                    loginInformation === "login" ?
                    "войти" : "регистрация"
                }
            </button>
            {(loginInformation !== "super_admin") &&
                (loginInformation === "login") ?
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