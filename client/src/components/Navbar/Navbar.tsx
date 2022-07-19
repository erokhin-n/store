import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { EnumRoute } from "../../enums/enums"
import { useCheckQuery, useRemoveCookieMutation } from "../../store/apiSlice/userSlice"
import style from './Navbar.module.css'
import { LoginActions, LoginState } from "../../App"

const Navbar = () => {

    const [removeCookie] = useRemoveCookieMutation()

    const {data, isError,isSuccess, isLoading} = useCheckQuery()

    const dispatch = useContext(LoginActions)

    const logout = () => {
        removeCookie()
        dispatch!({type: 'reset'})
    }

    if(isLoading){
        return <h3>loading</h3>
    }

    return (
        <div className={style.navbar}>
            {data?.role ?
                <NavLink
                    className={"navbarElement"}
                    to={EnumRoute.LOGIN}
                    onClick={() => logout()}
                >
                    выйти        
                </NavLink>
                :
                <NavLink
                    className={"navbarElement"}
                    to={EnumRoute.LOGIN}
                >
                    войти
                </NavLink>
            }
            <NavLink
                className={"navbarElement"}
                to={EnumRoute.SHOP}
            >
                магазин
            </NavLink>
            {(data?.role ===  "ADMIN" ) && 
                <NavLink
                    className={"navbarElement"} 
                    to={EnumRoute.ADMIN_PAGE}
                >
                    админ панель
                </NavLink>
            }
            {(data?.role === "SUPER_ADMIN") && 
                <NavLink
                    className={"navbarElement"} 
                    to={EnumRoute.SUPER_ADMIN_PAGE}
                >
                    super admin page
                </NavLink>
            }
            {(data?.role === "USER") && 
                <NavLink
                    className={"navbarElement"} 
                    to={EnumRoute.BASKET}
                >
                    корзина
                </NavLink>
            }
            <div>{data?.email}</div>
        </div>
    )
}

export default Navbar