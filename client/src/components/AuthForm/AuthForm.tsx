import { FC, FormEvent, MouseEventHandler, useContext, useEffect, useState } from "react"
import { IAuthForm } from "../../interface/interface"
import AuthFormFields from "./AuthFormFields";
import { emailValidation, passwordValidation } from "../../validation/AuthValidation";
import { formView } from "../../enum/enum";
import { LoginActions } from "../../pages/Login";

const AuthForm:FC<any> = ({
    pagesStates,
    fetchForm,
    errorServerMessage,
    loginInformation,
}) => {

    const dispatch = useContext(LoginActions)
     
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [submitError, setSubmitError] = useState<string>('')
    const [serverError, setServerError] = useState<string | undefined>('')

    const authFormStates = {
        email, setEmail,
        emailError, setEmailError,
        password, setPassword,
        passwordError, setPasswordError,
        submitError, setSubmitError, 
        serverError, setServerError
    }

    const adminRegStates = {
        adminRegMessage: pagesStates.adminRegMessage, 
        setAdminRegMessage: pagesStates.setAdminRegMessage
    } 


    useEffect(()=> {
        setServerError(errorServerMessage)
    },[errorServerMessage])


    const sendForm = (event:FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        // passwordValidation(password, setPasswordError)
        // emailValidation(email, setEmailError)
   
        if( !emailError && 
            !passwordError &&
            email.length && 
            password.length
        ) {
            fetchForm(email, password)
            if(errorServerMessage) {
                setEmail('')
                setPassword('')
            }

        } else {
            setSubmitError("необходимо исправить форму перед " + 
            (loginInformation === formView.login ? "входом" : "регистрацией"))
        }
    }

    const handleClick:MouseEventHandler<HTMLElement> = (e) => {
        e.stopPropagation()
        dispatch!({type:'setHideValidationError', payload:false})
    }

    useEffect(()=> {
        if(pagesStates.hideValidationError){
            setEmailError('')
            setPasswordError('')
            setSubmitError('')
            setServerError('')
        }
    },[pagesStates.hideValidationError])
    
    return (
        <div onClick={handleClick} style={{background: 'lightgray', maxWidth: '400px', margin:'auto'}}>
            <AuthFormFields
                sendForm={sendForm}
                authFormStates={authFormStates}
                loginInformation={loginInformation}
                adminRegStates={adminRegStates}
            />
        </div>
    )
}
export default AuthForm