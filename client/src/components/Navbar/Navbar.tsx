import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { PagesEnum } from "../../enums/enums"
import { useCheckQuery, useRemoveCookieMutation } from "../../store/apiSlice/userSlice"
import { LoginActions } from "../../App"
import { initialState } from "../../store/reactReducer/authFormReducer"
import { animated, useSpring } from '@react-spring/web'
import Icon from "../svg/Navbar_lines/Navbar_icon"


const Navbar = () => {

    const [removeCookie] = useRemoveCookieMutation()

    const {data, isLoading} = useCheckQuery()

    const dispatch = useContext(LoginActions)

    const [navbarVisible, setNavbarVisible] = useState<boolean>(false)

    const logout = () => {
        removeCookie()
        dispatch!({type: 'reset', payload: initialState})
    }

    const navbarView = ()=> {
        setNavbarVisible(!navbarVisible)
    }

    if(isLoading){
        return <h3>loading navbar...</h3>
    }

    return (
        <div className="navbar">
            <div className="button_search_navbar_container">
                <div 
                    // className={navbarVisible ? "navbar_cross" : "navbar_button"}
                    onClick={()=> navbarView()}
                >
                    <Icon navbarVisible={navbarVisible} />
                </div>
                <input 
                    placeholder="поиск устройства"
                    type="text"
                    className="navbar_search"
                />
            </div>
            <div className={
                (navbarVisible) ? 
                "navbar_elements_container" : 
                "navbar_elements_container_hidden"}
            >
                {data?.role ?
                    <NavLink
                        className={ "navbar_element"}
                        to={PagesEnum.ENTER}
                        onClick={() => logout()}
                    >
                        выйти        
                    </NavLink>
                    :
                    <NavLink
                        className={ "navbar_element" }
                        to={PagesEnum.ENTER}
                    >
                        войти
                    </NavLink>
                }
                <NavLink
                    className={  "navbar_element" }
                    to={PagesEnum.SHOP}
                >
                    магазин
                </NavLink>
                {(data?.role ===  "ADMIN" ) && 
                    <NavLink
                        className={ "navbar_element" } 
                        to={PagesEnum.ADMIN_PAGE}
                    >
                        админ панель
                    </NavLink>
                }
                {(data?.role === "SUPER_ADMIN") && 
                    <NavLink
                        className={ "navbar_element" } 
                        to={PagesEnum.SUPER_ADMIN_PAGE}
                    >
                        super admin page
                    </NavLink>
                }
                {(data?.role === "USER") && 
                    <NavLink
                        className={ "navbar_element" } 
                        to={PagesEnum.BASKET}
                    >
                        корзина
                    </NavLink>
                }
                <div>{data?.email}</div>
            </div>
        </div>
    )
}

export default Navbar