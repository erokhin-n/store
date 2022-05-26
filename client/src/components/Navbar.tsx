import { FC } from "react"
import { NavLink } from "react-router-dom"
import { Route } from "../enum/enum"


const Navbar:FC = () => {
    return (
        <div className={"navbar"}>
            <NavLink
                className={"navbarElement"}
                to={Route.Login}
            >
                войти
            </NavLink>
            <NavLink
                className={"navbarElement"}
                to={Route.Shop}
            >
                магазин
            </NavLink>
        </div>
    )
}

export default Navbar