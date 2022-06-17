import { FC, useEffect, useReducer, useState } from "react"
import { Link } from "react-router-dom"
import { EnumRoute } from "../../enum/enum"
import { IAuthFormFields } from "../../interface/interface"
import ErrorModal from "../ErrorModal"
import { emailValidation, passwordValidation } from "../../validation/AuthValidation"
import style from './AuthFormFields.module.css'

const AuthFormFields:FC<IAuthFormFields> = ({
    sendForm,
    email,
    changeEmail,
    password,
    changePassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    serverError,
    submitError,
    loginInformation,
    adminRegMessage
}) => {

    return (
        <form 
            className={"authForm"}
        >

            <input 
                type="text" 
                placeholder="введите почту"
                className={emailError ? 
                    [style.inputError, style.input].join(' ') : 
                    style.input}
                value={email}
                onChange={e => changeEmail(e.target.value)}
                onBlur={() => emailValidation(email, setEmailError)}
            />
            {emailError && <ErrorModal error={emailError} />}
            <input
                type="text"
                placeholder="введите пароль"
                className={passwordError ? 
                    [style.inputError, style.input].join(' ') : 
                    style.input}
                value={password}
                onChange={e => changePassword(e.target.value)}
                onBlur={() =>  passwordValidation(password, setPasswordError)}
            />
            {passwordError && <ErrorModal error={passwordError} />}
            {submitError && <ErrorModal error={submitError} /> }
            {serverError && 
                <ErrorModal 
                    error={serverError
                        .split(":")[1]
                        .replace(/[\\\}]/gi, '')
                    } 
                />
            }
            {adminRegMessage}
            <button 
                className="authFormButton"
                onClick={ e => sendForm(e)}
            >
                {loginInformation === "super_admin" ? 
                    'регистрация админа' : 
                    loginInformation === "login" ?
                    "войти" : "регистрация"
                }
            </button>
            {loginInformation === "super_admin" ?
                null:
                loginInformation === "login" ?
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