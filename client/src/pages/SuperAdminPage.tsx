import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthForm from "../components/AuthForm"
import AuthFormFields from "../components/AuthFormFields"
import { EnumRoute } from "../enum/enum"
import { useAppDispatch } from "../hooks/hooks"
import { useRegistrationAdminMutation } from "../store/apiSlice"
import { setEmailinStore, setRole } from "../store/userSlice"

const SuperAdminPage = () => {

    const [
        registrationAdmin, 
        {
        data, 
        error
    }] = useRegistrationAdminMutation()

    useEffect(()=> {
        if(data) {
            console.log(data)
        }  
    },[data])

    const fetchForm = async (email:string, password:string) => {
        registrationAdmin({email, password}) 
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

    return (
        <section>
            <h3>регистрация администратора</h3>
            <AuthForm
                fetchForm={fetchForm}
                error_server_message={error_server_message}
                loginInformation={"super_admin"}   
            />    
        </section>
    )
}

export default SuperAdminPage