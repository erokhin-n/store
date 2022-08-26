import { MouseEventHandler, useContext, useEffect, useState } from "react"
import { LoginActions } from "../../App"
import AuthForm from "../../components/AuthForm/AuthForm"
import UserList from "../../components/UserList/UserList"
import { formView } from "../../enums/enums"
import { useRegistrationAdminMutation } from "../../store/apiSlice/userSlice"
import style from './SuperAdminPage.module.css'

const SuperAdminPage = () => {

    const [registrationAdmin, { error}] = useRegistrationAdminMutation()

    const dispatch = useContext(LoginActions)

    useEffect(()=> {
        dispatch!({type:'setFormView', payload: formView.FORM_SUPER_ADMIN})
    }, [])


    let errorServerMessage:string | undefined

    const hideValidation:MouseEventHandler<HTMLElement> = (e) => {
        // setHideValidationError(true)
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