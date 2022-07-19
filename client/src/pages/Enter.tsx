import { createContext, FormEvent, MouseEventHandler, useState, Dispatch, useReducer } from "react"
import { useNavigate } from "react-router-dom"
import AuthForm from "../components/AuthForm/AuthForm"
import { EnumRoute, formView } from "../enum/enum"
import { IAuthFormActions, IAuthFormState } from "../interface/interface"
import { useLoginMutation } from "../store/apiSlice/userSlice"
import { authFormReducer, initialState } from "../store/reactReducer/authFormReducer"

const Login = () => {

    const [login, {data, error, isSuccess}] = useLoginMutation()

    const [state, dispatch] = useReducer(authFormReducer, initialState)

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
        dispatch({type:"setHideValidationError", payload: true})
    }

    const pagesStates = {hideValidationError, setHideValidationError}

    return (
        <section onClick={hideValidation} style={{background: 'lightblue', height: '1000px'}}>
            <AuthForm />
        </section>
    )
}

export default Login
