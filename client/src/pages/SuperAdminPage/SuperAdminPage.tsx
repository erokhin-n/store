import { MouseEventHandler, useState } from "react"
import AuthForm from "../../components/AuthForm/AuthForm"
import UserList from "../../components/UserList/UserList"
import { formView } from "../../enum/enum"
import { useRegistrationAdminMutation } from "../../store/apiSlice/userSlice"
import style from './SuperAdminPage.module.css'

const SuperAdminPage = () => {

    const [registrationAdmin, { error}] = useRegistrationAdminMutation()

    const [adminRegMessage, setAdminRegMessage] = useState<string | ''>('')
    const [hideValidationError, setHideValidationError] = useState<boolean>(false)

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

    const pagesStates = {
        hideValidationError, 
        setHideValidationError,
        adminRegMessage,
        setAdminRegMessage
    }

    return (
        <section className={style.body} onClick={hideValidation} style={{background: 'darkgray', height: 'auto'}}>
            <div>
                <h3>регистрация администратора</h3>
                <AuthForm/>   
            </div> 
            <UserList />
        </section>
    )
}

export default SuperAdminPage