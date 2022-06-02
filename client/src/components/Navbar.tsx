import { FC } from "react"
import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { EnumRoute } from "../enum/enum"


const Navbar:FC = () => {

    const isAdmin = useSelector((state:any) => state.user.role)
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
            {isAdmin && <Link to={EnumRoute.AdminPage}>Admin Panel</Link>
            
            }
        </div>
    )
}

export default Navbar