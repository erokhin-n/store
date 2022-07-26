import { useContext, MouseEvent, useState, useEffect } from "react"
import { formView, ValidationResult } from "../../enums/enums"
import { emailValidation, passwordValidation } from "../../validation/AuthValidation"
import style from './AuthFormFields.module.css'
import { LoginActions, LoginState } from "../../App"
import { useLoginMutation, useRegistrationAdminMutation, useRegistrationMutation } from "../../store/apiSlice/userSlice"
import { initialState } from "../../store/reactReducer/authFormReducer"
import { serverError } from "../../hooks/serverError"

const AuthFormFields= () => {

    const state = useContext(LoginState)
    const dispatch = useContext(LoginActions)

    const [login, {error: loginError,}] = useLoginMutation()
    const [registration, {error: registrationError}] = useRegistrationMutation()
    const [registrationAdmin, { error: adminRegError}] = useRegistrationAdminMutation()

    useEffect(()=> {
        switch(state!.formView){
            case formView.FORM_LOGIN:
                dispatch!({type:'setServerErrorMessage', payload: serverError(loginError)});
                break;
            case formView.FORM_REGISTRATION:
                dispatch!({type: 'setServerErrorMessage', payload: serverError(registrationError)});
                break;
            case formView.FORM_SUPER_ADMIN:
                dispatch!({type: 'setServerErrorMessage', payload: serverError(adminRegError)});
                break;
        }
    },[loginError, registrationError, adminRegError])
    

    const changeEmail = (e:string)  => {
        dispatch!({type:'setServerErrorMessage', payload: ''})
        dispatch!({type:'setEmailValidationResult', payload: emailValidation(e)})
        if(state?.email.validInfo !== ValidationResult.FIRST_ADDITION) {
            dispatch!({type:"setEmail",payload: e})
            dispatch!({type:"setEmailValidationInfo", payload: emailValidation(e)})
        }
        dispatch!({type:'setEmail', payload: e})
    }

    const changePassword = (e:string) => {
        dispatch!({type:'setServerErrorMessage', payload: ''})
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
                    login({email: state!.email.value, password: state!.password.value});
                    // dispatch!({type:'reset', payload: initialState});
                    break;
                case formView.FORM_REGISTRATION:
                    registration({email: state!.email.value, password: state!.password.value});
                    // dispatch!({type:'reset', payload: initialState});
                    break;
                case formView.FORM_SUPER_ADMIN:
                    registrationAdmin({email: state!.email.value, password: state!.password.value});
                    dispatch!({type:'superAdminReset'});
                    break;
            }
        } else {
            console.log('dont send')
        }
    }

    // console.log(state!.formView)

    return (
        <form 
            className={"authForm"}
        >
            <input 
                type="text" 
                placeholder="введите почту"
                className={state!.email.validInfo === ValidationResult.ERROR ? 
                    [style.inputError, style.input].join(' ') : 
                    style.input}
                value={state?.email.value}
                onChange={e => changeEmail(e.target.value)}
                // onBlur={() => emailValidation(authFormStates.email, authFormStates.setEmailError)}
            />
            {/* {authFormStates.emailError && <ErrorModal error={authFormStates.emailError} />} */}
            <input
                type="text"
                placeholder="введите пароль"
                className={state!.password.validInfo === ValidationResult.ERROR ? 
                    [style.inputError, style.input].join(' ') : 
                    style.input}
                value={state!.password.value}
                onChange={e => changePassword(e.target.value)}
                // onBlur={() =>  passwordValidation(authFormStates.password, authFormStates.setPasswordError)}
            />
            {state!.serverErrorMessage}
            {/* {authFormStates.passwordError && <ErrorModal error={authFormStates.passwordError} />} */}
            {/* {authFormStates.submitError && <ErrorModal error={authFormStates.submitError} /> } */}
            {/* {authFormStates.serverError && 
                <ErrorModal 
                    error={authFormStates.serverError
                        .split(":")[1]
                        .replace(/[\\\}]/gi, '')
                    } 
                />
            } */}
            <button 
                className="authFormButton"
                onClick={ e =>  handleClick(e)}
            >
                {state!.formView === formView.FORM_SUPER_ADMIN ? 
                    'регистрация админа' : 
                    state!.formView === formView.FORM_LOGIN ?
                    "войти" : "регистрация"
                }
            </button>
            {state!.formView === formView.FORM_SUPER_ADMIN ?
                null :
                (state!.formView === formView.FORM_LOGIN) ?
                <div>
                    Нет аккаунта? 
                    <div onClick={()=> dispatch!({type:'setFormView', payload: formView.FORM_REGISTRATION})}
                        style={{cursor:'pointer', color:'blue'}}
                    >
                        зарегистрируйтесь
                    </div>
                </div>
                :
                <div>
                    есть аккаунт? 
                    <div onClick={()=> dispatch!({type:'setFormView', payload: formView.FORM_LOGIN})}
                        style={{cursor:'pointer', color:'blue'}}
                    >   
                        войдите
                    </div>
                </div>    
            }
        </form>
    )
} 

export default AuthFormFields