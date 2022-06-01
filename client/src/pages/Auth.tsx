import React, { SetStateAction, useEffect, useState } from "react"
import { useLocation, useNavigate} from "react-router-dom"
import AuthForm from "../components/AuthForm"
import { EnumRoute } from "../enum/enum"
import { IToken } from "../interface/interface"
import {  useLoginMutation, useRegistrationMutation } from "../store/apiSlice"


const Auth = () => {

    const [email, setEmail] = useState<string | undefined>('')
    const [password, setPassword] = useState<string | undefined>('')
    const [role, setRole] = useState<string | undefined>('')

    const [registration, {isLoading, data: registration_role}] = useRegistrationMutation()
    const [login, {isLoading: logLoading, data: login_role}] = useLoginMutation()
  
    const location = useLocation()
    const navigate = useNavigate()

    const isLogin = location.pathname === EnumRoute.Login

    const changeEmail = (e:SetStateAction<string | undefined>):void  => {
        setEmail(e)
    }

    const changePassword = (e:SetStateAction<string | undefined>):void  => {
        setPassword(e)
    } 

    useEffect(()=> {
        if(login_role) {
            localStorage.setItem('role', login_role.role)
            navigate(EnumRoute.Shop)
        }  
    },[login_role])

    useEffect(()=> {
        if(registration_role) {
            localStorage.setItem('role', registration_role.role)
            navigate(EnumRoute.Shop)
        }  
    },[registration_role])

    const sendForm = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if(isLogin) {
                const user:any = {
                    email,
                    password
                } 
                login(user)
                // if(login_role) {localStorage.setItem("role",login_role.role);console.log(regrole.role)}
            } else {
                await registration({email, password}).unwrap()
                // if(regrole) localStorage.setItem("role",regrole.role)
                // console.log(regrole.role)
            }
            
            setEmail('')
            setPassword('')
        } catch(e:any) {
            console.log(`${e.message} ошибка регистрации`)
        }
    }

    if(isLoading) {
        return <h3>reg load...</h3>
    }

    if(logLoading) {
        return <h3>log load...</h3>
    }

    return (
        <AuthForm
            email={email}
            password={password}
            changeEmail={changeEmail}
            changePassword={changePassword}
            sendForm={sendForm}
            isLogin={isLogin}
        />
    )
}

export default Auth