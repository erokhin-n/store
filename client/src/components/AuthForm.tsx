import { FC, FormEvent, MouseEventHandler, SetStateAction, useState } from "react"
import { Link } from "react-router-dom"
import { EnumRoute } from "../enum/enum"
import { IAuthData, IAuthFormProps } from "../interface/interface"
import { useForm, SubmitHandler  } from "react-hook-form";
import ErrorModal from "./ErrorModal";
import { validation } from "./validation/validation";

const AuthForm:FC<IAuthFormProps> = ({
    fetchForm,
    isLogin,
    error_server_message
}) => {
     
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [formIsValid, setFormIsValud] = useState<boolean>(false)
    const [formErrors, setFormErrors] = useState<any>({email: '', password: ''})
    const [errorInput, setErrorInput] = useState<any>('')

    const changeEmail = (e:string)  => {
        validation(
            "email", 
            e, 
            setFormErrors, 
            setFormIsValud,
            setErrorInput,
            formErrors
        )
        setEmail(e)
    }

    const changePassword = (e:string):void  => {
        validation(
            "password", 
            e, 
            setFormErrors, 
            setFormIsValud,
            setErrorInput,
            formErrors
        )
        setPassword(e)
    } 

    console.log(formIsValid)
    console.log(formErrors)

    const sendForm = (e:any) => {
        e.preventDefault()
        if(!formErrors.email && !formErrors.password) {
            fetchForm(email, password)
            setEmail('')
            setPassword('')
        } else {
            setFormErrors('fix this fuckin form!')
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
            {(formErrors && formErrors.email) && <ErrorModal errors={formErrors.email} />}
            <input
                type="text"
                placeholder="введите пароль"
                className="authFormInput"
                value={password}
                onChange={e => changePassword(e.target.value)}
            />
            {(formErrors && formErrors.password) && <ErrorModal errors={formErrors.password} />}
            {(formErrors && errorInput === '') && <ErrorModal errors={formErrors} /> }
            {error_server_message && 
                <ErrorModal 
                    errors={error_server_message
                        .split(":")[1]
                        .replace(/[^a-zа-яё]/gi, ' ')} 
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