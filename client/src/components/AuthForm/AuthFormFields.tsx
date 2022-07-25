import { useContext, MouseEvent } from "react"
import { formView, ValidationResult } from "../../enums/enums"
import { emailValidation, passwordValidation } from "../../validation/AuthValidation"
import style from './AuthFormFields.module.css'
import { LoginActions, LoginState } from "../../App"
import { useLoginMutation } from "../../store/apiSlice/userSlice"
import { initialState } from "../../store/reactReducer/authFormReducer"
import { useServerError } from "../../hooks/useServerError"

const AuthFormFields= () => {

    const state = useContext(LoginState)
    const dispatch = useContext(LoginActions)

    const [login, {data, error, isSuccess}] = useLoginMutation()

    const changeEmail = (e:string)  => {
        dispatch!({type:'setEmailValidationResult', payload: emailValidation(e)})
        if(state?.email.validInfo !== ValidationResult.FIRST_ADDITION) {
            dispatch!({type:"setEmail",payload: e})
            dispatch!({type:"setEmailValidationInfo", payload: emailValidation(e)})
        }
        dispatch!({type:'setEmail', payload: e})
    }

    const changePassword = (e:string) => {
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
            console.log('send')
            if(state!.formView === formView.FORM_LOGIN) {
                console.log('login')
                login({email: state!.email.value, password: state!.password.value})
                dispatch!({type:'reset', payload: initialState})
            } else if (state!.formView === formView.FORM_REGISTRATION) {
                console.log('registration')
            } else if(state!.formView === formView.FORM_SUPER_ADMIN) {
                console.log('super_admin')
                dispatch!({type:'superAdminReset'})
            }
        } else {
            console.log('dont send')
        }
    }

    const serverError = useServerError(error)
    if(serverError) {
        dispatch!({type:'setServerErrorMessage', payload: serverError})
    }

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
            {serverError}
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
            {/* {adminRegStates!.adminRegMessage} */}
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