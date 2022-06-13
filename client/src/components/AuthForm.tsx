import { FC, FormEventHandler, SetStateAction, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { EnumRoute } from "../enum/enum"
import { IAuthFormProps, IFormError } from "../interface/interface"
import ErrorModal from "./ErrorModal";
import { validation } from "./validation/validation";

const AuthForm:FC<IAuthFormProps> = ({
    fetchForm,
    isLogin,
    error_server_message
}) => {
     
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [formError, setFormError] = useState<IFormError>({email: '', password: ''})
    const [submitError, setSubmitError] = useState<string>('')
    const [serverError, setServerError] = useState<string | undefined>()

    const changeEmail = (e:string)  => {
        validation(
            "email", 
            e, 
            setFormError, 
            formError
        )
        setServerError('')
        setSubmitError('')
        setEmail(e)
    }

    const changePassword = (e:string) => {
        validation(
            "password", 
            e, 
            setFormError, 
            formError
        )
        setServerError('')
        setSubmitError('')
        setPassword(e)
    } 

    useEffect(()=> {
        setServerError(error_server_message)
    },[error_server_message])


    const sendForm:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if(!formError.email && !formError.password) {
            fetchForm(email, password)
            setEmail('')
            setPassword('')
        } else {
            setSubmitError('fix this fucking form!')
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
            />
            {formError.email && <ErrorModal error={formError.email} />}
            <input
                type="text"
                placeholder="введите пароль"
                className="authFormInput"
                value={password}
                onChange={e => changePassword(e.target.value)}
            />
            {formError.password && <ErrorModal error={formError.password} />}
            {submitError && <ErrorModal error={submitError} /> }
            {serverError && 
                <ErrorModal 
                    error={serverError
                        .split(":")[1]
                        .replace(/[^a-zа-яё]/gi, ' ')
                    } 
                />
            }
            <button
                className="authFormButton"
            >
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