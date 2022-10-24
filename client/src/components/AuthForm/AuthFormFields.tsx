import { FC, useContext } from "react"
import { formView, ValidationResult } from "../../enums/enums"
import { LoginActions, LoginState } from "../../App"
import { IAuthFormFields } from "../../interface/interface"
import ErrorModal from "../ErrorModal"


const AuthFormFields:FC<IAuthFormFields>= ({changeEmail, changePassword, handleClick}) => {

    const state = useContext(LoginState)
    const dispatch = useContext(LoginActions)

    return (
        <form 
            className="authForm"
        >
            {/* <span className="authFormLabel">{state?.formView === formView.FORM_LOGIN ? 
                "ВХОД" :
                state?.formView === formView.FORM_REGISTRATION ?
                "РЕГИСТРАЦИЯ" :
                "РЕГИСТРАЦИЯ АДМИНА"
                }
            </span> */}
            <input
                type="text" 
                placeholder="введите почту"
                value={state?.email.value}
                onChange={e => changeEmail(e.target.value)}
            />
            {state!.email.validInfo === ValidationResult.ERROR && 
                <ErrorModal error="введите почту в формате email@mail.com" />
            }
            <input
                type="text"
                placeholder="введите пароль"
                value={state!.password.value}
                onChange={e => changePassword(e.target.value)}
            />
            {state!.password.validInfo === ValidationResult.ERROR && 
                <ErrorModal error="пароль должен состоять из 8ми букв" />
            }
            {state!.serverMessage && <ErrorModal error={state!.serverMessage} />}
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
                <div className="regAndLoginContainer">
                    <span className="accountInfo">Нет аккаунта?</span> 
                    <span 
                        className="regAndLoginToggle"
                        onClick={()=> dispatch!({type:'setFormView', payload: formView.FORM_REGISTRATION})}
                    >
                        зарегистрируйтесь
                    </span>
                </div>
                :
                <div className="regAndLoginContainer">
                    <span className="accountInfo">есть аккаунт?</span> 
                    <span
                        onClick={()=> dispatch!({type:'setFormView', payload: formView.FORM_LOGIN})}
                        className="regAndLoginToggle"
                    >   
                        войдите
                    </span>
                </div>    
            }
        </form>
    )
} 

export default AuthFormFields