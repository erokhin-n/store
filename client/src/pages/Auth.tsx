import React, { ChangeEventHandler, FormEvent, SetStateAction, useEffect, useState } from "react"
import { useLocation, useNavigate} from "react-router-dom"
import AuthForm from "../components/AuthForm"
import { EnumRoute } from "../enum/enum"
import { useAppDispatch } from "../hooks/hooks"
import { IToken } from "../interface/interface"
import {  useLoginMutation, useRegistrationMutation } from "../store/apiSlice"
import { setRole, setEmailinStore } from "../store/userSlice"


const Auth = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [registration, {isLoading, data: registration_data}] = useRegistrationMutation()
    const [login, {isLoading: logLoading, data: login_data}] = useLoginMutation()
  
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const isLogin = location.pathname === EnumRoute.Login

    const changeEmail = (e:SetStateAction<string>):void  => {
        setEmail(e)
    }

    const changePassword = (e:SetStateAction<string>):void  => {
        setPassword(e)
    } 

    useEffect(()=> {
        if(login_data) {
            dispatch(setRole(login_data.role))
            dispatch(setEmailinStore(login_data.email))
            navigate(EnumRoute.Shop)
        }  
    },[login_data])

    useEffect(()=> {
        if(registration_data) {
            dispatch(setRole(registration_data.role))
            dispatch(setEmailinStore(registration_data.email))
            navigate(EnumRoute.Shop)
        }  
    },[registration_data])

    const sendForm = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if(isLogin) {
                login({email, password})
            } else {
                registration({email, password})
            }
            
            setEmail('')
            setPassword('')
        } catch(e) {
            console.log(`${e} ошибка регистрации`)
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