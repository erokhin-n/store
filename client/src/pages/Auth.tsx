import React, { SetStateAction, useState } from "react"
import AuthForm from "../components/AuthForm"
import { useRegistrationMutation } from "../store/apiSlice"


const Auth = () => {

    const [email, setEmail] = useState<string | undefined>('')
    const [password, setPassword] = useState<string | undefined>('')

    const [registration, {isLoading, data: token}] = useRegistrationMutation()

    const changeEmail = (e:SetStateAction<string | undefined>):void  => {
        setEmail(e)
    }

    const changePassword = (e:SetStateAction<string | undefined>):void  => {
        setPassword(e)
    } 

    const sendForm = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const token = await registration({email, password}).unwrap()
            setEmail('')
            setPassword('')
            console.log(token)
        } catch(e) {
            alert(e)
            console.log(e)
        }
    }

    if(isLoading) {
        return <h3>reg load...</h3>
    }

    return (
        <AuthForm
            email={email}
            password={password}
            changeEmail={changeEmail}
            changePassword={changePassword}
            sendForm={sendForm}
        />
    )
}

export default Auth