import { createContext, FormEvent, MouseEventHandler, useState, Dispatch, useReducer } from "react"
import { useNavigate } from "react-router-dom"
import AuthForm from "../components/AuthForm/AuthForm"
import { PagesEnum, formView } from "../enums/enums"
import { useServerError } from "../hooks/useServerError"
import { IAuthFormActions, IAuthFormState } from "../interface/interface"
import { useLoginMutation } from "../store/apiSlice/userSlice"
import { authFormReducer, initialState } from "../store/reactReducer/authFormReducer"

const Enter = () => {

    const [state, dispatch] = useReducer(authFormReducer, initialState)

    const navigate = useNavigate()

    const hideValidation:MouseEventHandler<HTMLElement> = (e):void => {
        dispatch({type:"setHideValidationError", payload: true})
    }

    return (
        <section onClick={hideValidation} style={{background: 'lightblue', height: '1000px'}}>
            <AuthForm />
        </section>
    )
}

export default Enter

