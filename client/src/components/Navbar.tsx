import { FC } from "react"
import { NavLink } from "react-router-dom"
import { EnumRoute } from "../enum/enum"


const Navbar:FC = () => {
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
            
        </div>
    )
}

export default Navbar