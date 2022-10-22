import { FC, useContext } from "react"
import { formView, ValidationResult } from "../../enums/enums"
import { LoginActions, LoginState } from "../../App"
import { IAuthFormFields } from "../../interface/interface"
import React from "react"
import ErrorModal from "../ErrorModal"


const AuthFormFields:FC<IAuthFormFields>= ({changeEmail, changePassword, handleClick}) => {

    const state = useContext(LoginState)
    const dispatch = useContext(LoginActions)

    return (
        <form 
            className="authForm"
        >
            <input
                type="text" 
                placeholder="введите почту"
                // className={state!.email.validInfo === ValidationResult.ERROR ? 
                //     [style.inputError, style.input].join(' ') : 
                //     style.input}
                value={state?.email.value}
                onChange={e => changeEmail(e.target.value)}
            />
            {state!.email.validInfo === ValidationResult.ERROR && 
                <ErrorModal error="введите почту в формате email@mail.com" />
            }
            <input
                type="text"
                placeholder="введите пароль"
                // className={state!.password.validInfo === ValidationResult.ERROR ? 
                //     [style.inputError, style.input].join(' ') : 
                //     style.input}
                value={state!.password.value}
                onChange={e => changePassword(e.target.value)}
            />
            {state!.password.validInfo === ValidationResult.ERROR && 
                <ErrorModal error="пароль должен состоять из 8ми букв" />
            }
            {state!.serverMessage && <ErrorModal error={state!.serverMessage} />}
            {/* <div>"test message"</div> */}
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
                    <span className="accountInfo">Нет аккаунта?</span> 
                    <span 
                        className="regAndLoginToggle"
                        onClick={()=> dispatch!({type:'setFormView', payload: formView.FORM_REGISTRATION})}
                    >
                        зарегистрируйтесь
                    </span>
                </div>
                :
                <div>
                    есть аккаунт? 
                    <div onClick={()=> dispatch!({type:'setFormView', payload: formView.FORM_LOGIN})}
                        
                    >   
                        войдите
                    </div>
                </div>    
            }
        </form>
    )
} 

export default AuthFormFields