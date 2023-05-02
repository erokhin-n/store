import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { PagesEnum } from "../../enums/enums"
import { useCheckQuery, useRemoveCookieMutation } from "../../store/apiSlice/userSlice"
import { LoginActions } from "../../App"
import { initialState } from "../../store/reactReducer/authFormReducer"
import { animated, useSpring } from '@react-spring/web'
import NavbarBurger from "../../images/svg/Navbar_lines/NavbarBurger"
import Locker from "../../images/svg/enter/Locker"
import ShopIcon from "../../images/svg/shop/ShopIcon"
import SuperAdminIcon from "../../images/svg/SuperAdminIcon"
import BasketIcon from "../../images/svg/BasketIcon"


const Navbar = () => {

    const [removeCookie] = useRemoveCookieMutation()

    const {data, isLoading} = useCheckQuery()

    const dispatch = useContext(LoginActions)

    const [navbarVisible, setNavbarVisible] = useState<boolean>(true)

    const logout = () => {
        removeCookie()
        dispatch!({type: 'reset', payload: initialState})
    }

    const navbarView = ()=> {
        setNavbarVisible(!navbarVisible)
    }

    const testAnimation = useSpring({
        transform: navbarVisible ? "translateX(0px)" : "translateX(-1000px)",
    })

    if(isLoading){
        return <h3>loading navbar...</h3>
    }

    return (
        <nav>
            {/* <div className="button_search_navbar_container">
                <div 
                    className="navbar_button"
                    onClick={()=> navbarView()}
                >
                    <NavbarBurger navbarVisible={navbarVisible} />
                </div>
            </div> */}
            <div 
                className={"nav-wrapper row"}
            >
                {data?.role ?
                    <NavLink
                        className={ "navbar_element"}
                        to={PagesEnum.ENTER}
                        onClick={() => logout()}
                    >   
                        {/* <Locker /> */}
                        <span className="navbarText">выйти</span>        
                    </NavLink>
                    :
                    <NavLink
                        className={ "navbar_element"}
                        to={PagesEnum.ENTER}
                        onClick={()=> navbarView()}
                    >
                        {/* <Locker /> */}
                        <span className="col s2">войти</span>
                    </NavLink>
                
                }
                <NavLink
                    className={  "navbar_element" }
                    to={PagesEnum.SHOP}
                >
                    {/* <ShopIcon /> */}
                    <span 
                        onClick={()=> navbarView()}
                        className="col s4"
                    >
                        магазин
                    </span>
                </NavLink>
                {(data?.role ===  "ADMIN" ) && 
                    <NavLink
                        className={ "navbar_element" } 
                        to={PagesEnum.ADMIN_PAGE}
                    >
                        {/* <SuperAdminIcon /> */}
                        <span className="navbarText">админ панель</span>
                    </NavLink>
                }
                {(data?.role === "SUPER_ADMIN") && 
                    <NavLink
                        className={ "navbar_element" } 
                        to={PagesEnum.SUPER_ADMIN_PAGE}
                    >
                        {/* <SuperAdminIcon /> */}
                        <span className="navbarText">super admin page</span>
                    </NavLink>
                }
                {(data?.role === "USER") && 
                    <NavLink
                        className={ "navbar_element" } 
                        to={PagesEnum.BASKET}
                        onClick={()=> navbarView()}
                    >
                        {/* <BasketIcon /> */}
                        <span className="navbarText">корзина</span>
                    </NavLink>
                }
                <div>{data?.email}</div>
            </div>
        </nav>
    )
}

export default Navbar