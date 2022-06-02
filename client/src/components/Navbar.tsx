import { FC } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { EnumRoute } from "../enum/enum"


const Navbar:FC = () => {

    const role = useSelector((state:any) => state.user.role)

    return (
        <div className={"navbar"}>
            <NavLink
                className={"navbarElement"}
                to={EnumRoute.Login}
            >
                войти
            </NavLink>
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
        </div>
    )
}

export default Navbar