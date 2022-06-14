import { FC, FormEventHandler, SetStateAction, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { EnumRoute } from "../enum/enum"
import { IAuthFormProps, IFormError } from "../interface/interface"
import ErrorModal from "./ErrorModal";
import { emailValidation, passwordValidation } from "./validation/AuthValidation";

const AuthForm:FC<IAuthFormProps> = ({
    fetchForm,
    isLogin,
    error_server_message
}) => {
     
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [submitError, setSubmitError] = useState<string>('')
    const [serverError, setServerError] = useState<string | undefined>('')

    const changeEmail = (e:string)  => {
        if(emailError) emailValidation(e, setEmailError)
        
        setServerError('')
        setSubmitError('')
        setEmail(e)
    }

    const changePassword = (e:string) => {
        if(passwordError) passwordValidation(e, setPasswordError)
        setServerError('')
        setSubmitError('')
        setPassword(e)
    } 

    useEffect(()=> {
        setServerError(error_server_message)
    },[error_server_message])


    const sendForm = (e:any) => {
        e.preventDefault()
        
        passwordValidation(password, setPasswordError)
        emailValidation(email, setEmailError)
   
        if( !emailError && 
            !passwordError && 
            email.length && 
            password.length
        ) {
            fetchForm(email, password)
            setEmail('')
            setPassword('')
        } else {
            setSubmitError("необходимо исправить форму перед " + (isLogin ? "входом" : "регистрацией"))
        }
    }
    
    return (
        <form 
            className={"authForm"}
            onSubmit={sendForm}
        >

            <input 
                type="text" 
                placeholder="введите почту"
                className="authFormInput"
                value={email}
                onChange={e => changeEmail(e.target.value)}
                onBlur={() => emailValidation(email, setEmailError)}
            />
            {emailError && <ErrorModal error={emailError} />}
            <input
                type="text"
                placeholder="введите пароль"
                className="authFormInput"
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
                        .replace(/[^a-zа-яё]/gi, ' ')
                    } 
                />
            }
            <button className="authFormButton">
                {isLogin ? 'войти' : 'регистрация'}
            </button>
            {isLogin ? 
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



export default AuthForm