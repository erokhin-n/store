import { FC, FormEvent, MouseEventHandler, SetStateAction, useState } from "react"
import { Link } from "react-router-dom"
import { EnumRoute } from "../enum/enum"
import { IAuthData, IAuthFormProps } from "../interface/interface"
import { useForm, SubmitHandler  } from "react-hook-form";
import ErrorModal from "./ErrorModal";

const AuthForm:FC<IAuthFormProps> = ({
    fetchForm,
    isLogin,
    error_server_message
}) => {
    
    const { register, formState: { errors },handleSubmit, trigger } = useForm<IAuthData>({
        mode: "onBlur",
        reValidateMode: "onChange",
        // criteriaMode: 'all'
        // reValidateMode:"onChang"
    });

    console.log(errors)
     
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const changeEmail = async (e:SetStateAction<string>)  => {
        setEmail(e)
    }

    const changePassword = (e:SetStateAction<string>):void  => {
        setPassword(e)
    } 

    const onSubmit: SubmitHandler<IAuthData> = () => {
        fetchForm(email, password)
        setEmail('')
        setPassword('')
    }

    return (
        <form 
            className={"authForm"}
            onSubmit={handleSubmit(onSubmit)}
        >

            <input 
                {...register("email",{
                    required: true,
                    maxLength: 5,
                    pattern: /^[A-Za-z0-9_-]*$/,
                    }
                )}
                type="text" 
                placeholder="введите почту"
                className="authFormInput"
                value={email}
                onChange={e => changeEmail(e.target.value)}
            />
            {errors.email && <ErrorModal errors={errors.email} />}
            <input
                {...register("password", {
                    required: true,
                    maxLength: 5,
                    pattern: /^[A-Za-z0-9_-]*$/ 
                    })
                } 
                type="text"
                placeholder="введите пароль"
                className="authFormInput"
                value={password}
                onChange={e => changePassword(e.target.value)}
            />
            {errors.password && <ErrorModal errors={errors.password} />}
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