import { MouseEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthForm from "../components/AuthForm/AuthForm"
import { EnumRoute, formView } from "../enum/enum"
import { useRegistrationMutation } from "../store/apiSlice/userSlice"

const Registration = () => {

    const [registration, {data, error}] = useRegistrationMutation()

    const [hideValidationError, setHideValidationError] = useState<boolean>(false)

    const navigate = useNavigate()

    const fetchForm = async (email:string, password:string) => {
        registration({email, password}) 
        navigate(EnumRoute.Shop)
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

    const hideValidation:MouseEventHandler<HTMLElement> = (e) => {
        setHideValidationError(true)
    }

    const pagesStates = {hideValidationError, setHideValidationError}

    return (
        <section onClick={hideValidation} style={{background: 'lightblue', height: '1000px'}}>
            <AuthForm
                pagesStates={pagesStates}
                fetchForm={fetchForm}
                errorServerMessage={errorServerMessage}
                loginInformation={formView.registration}
            />
        </section>
    )
}

export default Registration