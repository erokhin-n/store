import { createContext, FormEvent, MouseEventHandler, useState, Dispatch, useReducer } from "react"
import { useNavigate } from "react-router-dom"
import AuthForm from "../components/AuthForm/AuthForm"
import { EnumRoute, formView } from "../enums/enums"
import { IAuthFormActions, IAuthFormState } from "../interface/interface"
import { useLoginMutation } from "../store/apiSlice/userSlice"
import { authFormReducer, initialState } from "../store/reactReducer/authFormReducer"

const Login = () => {

    const [login, {data, error, isSuccess}] = useLoginMutation()

    const [state, dispatch] = useReducer(authFormReducer, initialState)

    const navigate = useNavigate()


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

    return (
        <section onClick={hideValidation} style={{background: 'lightblue', height: '1000px'}}>
            <AuthForm />
        </section>
    )
}

export default Login

