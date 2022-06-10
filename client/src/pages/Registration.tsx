import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthForm from "../components/AuthForm"
import { EnumRoute } from "../enum/enum"
import { useAppDispatch } from "../hooks/hooks"
import { useRegistrationMutation } from "../store/apiSlice"
import { setEmailinStore, setRole } from "../store/userSlice"

const Registration = () => {

    const [
        registration, 
        {
        data, 
        error
    }] = useRegistrationMutation()

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(()=> {
        if(data) {
            dispatch(setRole(data.role))
            dispatch(setEmailinStore(data.email))
            navigate(EnumRoute.Shop)
        }  
    },[data])

    const fetchForm = async (email:string, password:string) => {
        registration({email, password}) 
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

    console.log(error)

    return (
        <AuthForm
            fetchForm={fetchForm}
            isLogin={false}
            error_server_message={error_server_message}
        />
    )
}

export default Registration