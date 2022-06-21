import { useState } from "react"
import AuthForm from "../../components/AuthForm/AuthForm"
import UserList from "../../components/UserList/UserList"
import { useRegistrationAdminMutation } from "../../store/apiSlice/userSlice"
import style from './SuperAdminPage.module.css'

const SuperAdminPage = () => {

    const [
        registrationAdmin, 
        {
        data, 
        error
    }] = useRegistrationAdminMutation()

    const [adminRegMessage, setAdminRegMessage] = useState<string | ''>('')

    const fetchForm = async (email:string, password:string) => {
        const response = await registrationAdmin({email, password})
        if('data' in response) {
            if('message' in response.data)
            setAdminRegMessage(response.data.message)    
        }
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
        <section className={style.body}>
            <div>
                <h3>регистрация администратора</h3>
                <AuthForm
                    fetchForm={fetchForm}
                    error_server_message={error_server_message}
                    loginInformation={"super_admin"}
                    adminRegMessage={adminRegMessage} 
                    setAdminRegMessage={setAdminRegMessage}
                />   
            </div> 
            <UserList />
        </section>
    )
}

export default SuperAdminPage