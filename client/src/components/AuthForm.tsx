import { FC } from "react"
import { IAuthFormProps } from "../interface/interface"


const AuthForm:FC<IAuthFormProps> = ({
    email, 
    password, 
    changeEmail, 
    changePassword, 
    sendForm}) => {

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
            <input 
                type="text"
                placeholder="введите пароль"
                className="authFormInput"
                value={password}
                onChange={e => changePassword(e.target.value)}
            />
            <button
                className="authFormButton"
            >
                регистрация
            </button>
        </form>
    )
}

export default AuthForm