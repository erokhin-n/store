import { FC, useContext } from "react"
import { formView, ValidationResult } from "../../enums/enums"
import { LoginActions, LoginState } from "../../App"
import { IAuthFormFields } from "../../interface/interface"
import ErrorModal from "../ErrorModal"
import Button from '@mui/material/Button';


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
            <Button 
                variant="contained"
                onClick={ e =>  handleClick(e)}
            >
                {state!.formView === formView.FORM_SUPER_ADMIN ? 
                    'регистрация админа' : 
                    state!.formView === formView.FORM_LOGIN ?
                    "войти" : "регистрация"
                }
            </Button>
            {state!.formView === formView.FORM_SUPER_ADMIN ?
                null :
                (state!.formView === formView.FORM_LOGIN) ?
                <div className="regAndLoginContainer">
                    <span className="accountInfo">Нет аккаунта?</span> 
                    <Button 
                        variant="contained"
                        onClick={()=> dispatch!({type:'setFormView', payload: formView.FORM_REGISTRATION})}
                    >
                        зарегистрируйтесь
                    </Button>
                </div>
                :
                <div className="regAndLoginContainer">
                    <span className="accountInfo">есть аккаунт?</span> 
                    <Button
                        onClick={()=> dispatch!({type:'setFormView', payload: formView.FORM_LOGIN})}
                        variant="contained"
                    >   
                        войдите
                    </Button>
                </div>    
            }
        </form>
    )
} 

export default AuthFormFields