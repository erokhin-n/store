import React, { SetStateAction, useState } from "react"
import { useLocation } from "react-router-dom"
import AuthForm from "../components/AuthForm"
import { EnumRoute } from "../enum/enum"
import { IToken } from "../interface/interface"
import {  useLoginMutation, useRegistrationMutation } from "../store/apiSlice"


const Auth = () => {

    const [email, setEmail] = useState<string | undefined>('')
    const [password, setPassword] = useState<string | undefined>('')
    const [role, setRole] = useState<string | undefined>('')

    const [registration, {isLoading, data: regrole}] = useRegistrationMutation()
    const [login, {isLoading: logLoading, data: login_role}] = useLoginMutation()
  
    const location = useLocation()

    const isLogin = location.pathname === EnumRoute.Login

    const changeEmail = (e:SetStateAction<string | undefined>):void  => {
        setEmail(e)
    }

    const changePassword = (e:SetStateAction<string | undefined>):void  => {
        setPassword(e)
    } 

    const sendForm = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if(isLogin) {
                const user:any = {
                    email,
                    password
                } 
                login(user)
            } else {
                await registration({email, password}).unwrap()
                localStorage.setItem("role",regrole.role)
                console.log(regrole)
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