import { MouseEventHandler, useReducer } from "react"
import AuthForm from "../components/AuthForm/AuthForm"
import { authFormReducer, initialState } from "../store/reactReducer/authFormReducer"

const Enter = () => {

    const [state, dispatch] = useReducer(authFormReducer, initialState)

    const hideValidation:MouseEventHandler<HTMLElement> = (e):void => {
        dispatch({type:"setHideValidationError", payload: true})
    }

    return (
        <section onClick={hideValidation} className="enter">
            <AuthForm />
        </section>
    )
}

export default Enter

