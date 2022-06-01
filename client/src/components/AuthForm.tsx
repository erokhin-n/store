import { FC } from "react"
import { Link } from "react-router-dom"
import { EnumRoute } from "../enum/enum"
import { IAuthFormProps } from "../interface/interface"


const AuthForm:FC<IAuthFormProps> = ({
    email, 
    password, 
    changeEmail, 
    changePassword, 
    sendForm,
    isLogin}) => {

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