    import { MouseEventHandler, useReducer } from "react"
import AuthForm from "../components/AuthForm/AuthForm"
import { authFormReducer, initialState } from "../store/reactReducer/authFormReducer"
import Grid from "@mui/material/Grid"

const Enter = () => {

    const [state, dispatch] = useReducer(authFormReducer, initialState)

    const hideValidation:MouseEventHandler<HTMLElement> = (e):void => {
        dispatch({type:"setHideValidationError", payload: true})
    }

    return (
        <Grid 
            container
            direction="column"
            columns={{xs:12}}
            alignItems="center" 
            onClick={hideValidation}
        >
            <AuthForm />
        </Grid>
    )
}

export default Enter

