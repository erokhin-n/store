import { NavLink } from "react-router-dom"
import { EnumRoute } from "../../enum/enum"
import { useCheckQuery, useRemoveCookieMutation } from "../../store/apiSlice/userSlice"
import style from './Navbar.module.css'

const Navbar = () => {

    const [removeCookie] = useRemoveCookieMutation()

    const {data, isError,isSuccess, isLoading} = useCheckQuery()

    const logout = () => {
        removeCookie()
    }

    if(isLoading){
        return <h3>loading</h3>
    }

    return (
        <div className={style.navbar}>
            {data?.role ?
                <NavLink
                    className={"navbarElement"}
                    to={EnumRoute.Login}
                    onClick={() => logout()}
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
            {(data?.role ===  "ADMIN" ) && 
                <NavLink
                    className={"navbarElement"} 
                    to={EnumRoute.AdminPage}
                >
                    админ панель
                </NavLink>
            }
            {(data?.role === "SUPER_ADMIN") && 
                <NavLink
                    className={"navbarElement"} 
                    to={EnumRoute.SuperAdminPage}
                >
                    super admin page
                </NavLink>
            }
            {(data?.role === "USER") && 
                <NavLink
                    className={"navbarElement"} 
                    to={EnumRoute.Basket}
                >
                    корзина
                </NavLink>
            }
            <div>{data?.email}</div>
        </div>
    )
}

export default Navbar