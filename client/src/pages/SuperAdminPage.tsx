import { useState } from "react"
import AuthForm from "../components/AuthForm/AuthForm"
import { IDataTest, IDataUserResponse } from "../interface/interface"
import { useRegistrationAdminMutation } from "../store/apiSlice"

const SuperAdminPage = () => {

    const [
        registrationAdmin, 
        {
        data, 
        error
    }] = useRegistrationAdminMutation()

    const [adminRegMessage, setAdminRegMessage] = useState<string | ''>('')

    const fetchForm = async (email:string, password:string) => {
        registrationAdmin({email, password}).then((res:any) => 
            setAdminRegMessage(res.data.message)).catch((e:unknown) => setAdminRegMessage(''))
    }

    if(adminRegMessage) {
        setTimeout(() => setAdminRegMessage(''), 3000)
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
                adminRegMessage={adminRegMessage} 
                setAdminRegMessage={setAdminRegMessage}
            />    
        </section>
    )
}

export default SuperAdminPage