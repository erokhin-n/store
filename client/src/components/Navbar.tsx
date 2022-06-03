import { FC } from "react"
import { NavLink } from "react-router-dom"
import { EnumRoute } from "../enum/enum"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { useRemoveCookieMutation } from "../store/apiSlice"
import { setEmailinStore, setRole } from "../store/userSlice"

const Navbar:FC = () => {

    const dispatch = useAppDispatch()

    const role = useAppSelector((state) => state.user.role)
    const email = useAppSelector((state) => state.user.email)

    const [removeCookie] = useRemoveCookieMutation()
    
    const logout = () => {
        removeCookie()
        dispatch(setRole(''))
        dispatch(setEmailinStore(''))
    }

    return (
        <div className={"navbar"}>
            {role ?
                <NavLink
                    className={"navbarElement"}
                    to={EnumRoute.Login}
                    onClick={logout}
                >
                    выйти        
                </NavLink>
                :
                <NavLink
                    className={"navbarElement"}
                    to={EnumRoute.Login}
                >
                    войти
                </NavLink>
            }
            <NavLink
                className={"navbarElement"}
                to={EnumRoute.Shop}
            >
                магазин
            </NavLink>
            {(role ===  "ADMIN" ) && 
                <NavLink
                    className={"navbarElement"} 
                    to={EnumRoute.AdminPage}
                >
                    админ панель
                </NavLink>
            }
            {(role === "USER") && 
                <NavLink
                    className={"navbarElement"} 
                    to={EnumRoute.Basket}
                >
                    корзина
                </NavLink>
            }
            <div>{email}</div>
        </div>
    )
}

export default Navbar