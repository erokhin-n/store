import { MouseEventHandler, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthForm from "../components/AuthForm/AuthForm"
import { EnumRoute } from "../enum/enum"
import { useAppDispatch } from "../hooks/hooks"
import { useRegistrationMutation } from "../store/apiSlice/userSlice"
import { setEmailinStore, setRole } from "../store/store/userStore"

const Registration = () => {

    const [
        registration, 
        {
        data, 
        error
    }] = useRegistrationMutation()

    const [hideValidationError, setHideValidationError] = useState<boolean>(false)

    const navigate = useNavigate()

    const fetchForm = async (email:string, password:string) => {
        registration({email, password}) 
        navigate(EnumRoute.Shop)
    }

    let error_server_message:string | undefined

    if (error) {
        if ('status' in error) {
            error_server_message = 'error' in error ? 
            error.error : 
                JSON.stringify(error.data)
        } else {
            error_server_message = error.message
        }
    }

    const hideValidation:MouseEventHandler<HTMLElement> = (e) => {
        console.log('i work, sorry!')
        setHideValidationError(true)
    }

    return (
        <section onClick={hideValidation} style={{background: 'red', height: '1000px'}}>
            <AuthForm
                hideValidationError={hideValidationError}
                setHideValidationError={setHideValidationError}
                fetchForm={fetchForm}
                error_server_message={error_server_message}
                loginInformation={"registration"}
            />
        </section>
    )
}

export default Registration