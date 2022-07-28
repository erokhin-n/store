import { FC, useContext } from "react"
import { formView, ValidationResult } from "../../enums/enums"
import style from './AuthFormFields.module.css'
import { LoginActions, LoginState } from "../../App"
import { IAuthFormFields } from "../../interface/interface"

const AuthFormFields:FC<IAuthFormFields>= ({changeEmail, changePassword, handleClick}) => {

    const state = useContext(LoginState)
    const dispatch = useContext(LoginActions)

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
            />
            <input
                type="text"
                placeholder="введите пароль"
                className={state!.password.validInfo === ValidationResult.ERROR ? 
                    [style.inputError, style.input].join(' ') : 
                    style.input}
                value={state!.password.value}
                onChange={e => changePassword(e.target.value)}
            />
            {state!.serverMessage}
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