import { FC, FormEvent, useEffect, useState } from "react"
import { IAuthFormProps } from "../../interface/interface"
import AuthFormFields from "./AuthFormFields";
import { emailValidation, passwordValidation } from "../../validation/AuthValidation";

const AuthForm:FC<IAuthFormProps> = ({
    fetchForm,
    error_server_message,
    loginInformation,
    adminRegMessage,
    setAdminRegMessage
}) => {
     
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [submitError, setSubmitError] = useState<string>('')
    const [serverError, setServerError] = useState<string | undefined>('')

    const changeEmail = (e:string)  => {
        if(emailError) emailValidation(e, setEmailError)
        if(setAdminRegMessage) setAdminRegMessage('')
        setServerError('')
        setSubmitError('')
        setEmail(e)
    }

    const changePassword = (e:string) => {
        if(passwordError) passwordValidation(e, setPasswordError)
        if(setAdminRegMessage) setAdminRegMessage('')
        setServerError('')
        setSubmitError('')
        setPassword(e)
    } 

    useEffect(()=> {
        setServerError(error_server_message)
    },[error_server_message])


    const sendForm = (event:FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        
        passwordValidation(password, setPasswordError)
        emailValidation(email, setEmailError)
   
        if( !emailError && 
            !passwordError &&
            email.length && 
            password.length
        ) {
            fetchForm(email, password)
            if(error_server_message) {
                setEmail('')
                setPassword('')
            }

        } else {
            setSubmitError("необходимо исправить форму перед " + 
            (loginInformation === "login" ? "входом" : "регистрацией"))
        }
    }
    
    return (
        <AuthFormFields
            sendForm={sendForm}
            email={email}
            changeEmail={changeEmail}
            password={password}
            changePassword={changePassword}
            emailError={emailError}
            setEmailError={setEmailError}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            serverError={serverError}
            submitError={submitError}
            loginInformation={loginInformation}
            adminRegMessage={adminRegMessage}
        />
    )
}



export default AuthForm