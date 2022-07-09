import { FormEvent, MouseEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthForm from "../components/AuthForm/AuthForm"
import { EnumRoute } from "../enum/enum"
import { useLoginMutation } from "../store/apiSlice/userSlice"

const Login = () => {

    const [login, {data, error, isSuccess}] = useLoginMutation()

    const [hideValidationError, setHideValidationError] = useState<boolean>(false)

    const navigate = useNavigate()

    const fetchForm = (email:string, password:string) => {
        login({email, password})  
        if(isSuccess) {
            navigate(EnumRoute.Shop)
        }
        
    }

    let errorServerMessage:string | undefined

    if (error) {
        if ('status' in error) {
            errorServerMessage = 'error' in error ? 
            error.error : 
                JSON.stringify(error.data)
        } else {
            errorServerMessage = error.message
        }
    }

    const hideValidation:MouseEventHandler<HTMLElement> = (e):void => {
        setHideValidationError(true)
    }

    const pagesStates = {hideValidationError, setHideValidationError}

    return (
        <section onClick={hideValidation} style={{background: 'lightblue', height: '1000px'}}>
            <AuthForm
                pagesStates={pagesStates}
                fetchForm={fetchForm}
                errorServerMessage={errorServerMessage}
                loginInformation={"login"}
            />
        </section>
    )
}

export default Login