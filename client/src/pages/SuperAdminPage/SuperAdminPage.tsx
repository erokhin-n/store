import {  useContext, useEffect } from "react"
import { LoginActions } from "../../App"
import AuthForm from "../../components/AuthForm/AuthForm"
import UserList from "../../components/UserList/UserList"
import { formView } from "../../enums/enums"
import style from './SuperAdminPage.module.css'

const SuperAdminPage = () => {

    const dispatch = useContext(LoginActions)

    useEffect(()=> {
        dispatch!({type:'setFormView', payload: formView.FORM_SUPER_ADMIN})
    }, [])


    return (
        <section className={style.body} style={{background: 'darkgray', height: 'auto'}}>
            <div>
                <h3>регистрация администратора</h3>
                <AuthForm/>   
            </div> 
            <UserList />
        </section>
    )
}

export default SuperAdminPage