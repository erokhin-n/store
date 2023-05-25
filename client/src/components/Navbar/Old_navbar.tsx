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
import LockIcon from '@mui/icons-material/Lock';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import AppBar from '@mui/material/AppBar';
import { Avatar, Paper } from "@mui/material"
import Logo_2 from "../../images/svg/Logo2"


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

    if(isLoading){
        return <h3>loading navbar...</h3>
    }

    return (
        <AppBar 
            position="static"
            sx={{bgcolor: '#D3D3D3'}}
        >
                <Logo_2 
                    sx={{fontSize: 100}}
                />
                
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
                        <span>войти</span>
                        <LockIcon/>
                    </NavLink>
                
                }
                <NavLink
                    className={  "navbar_element" }
                    to={PagesEnum.SHOP}
                >
                    <span 
                        onClick={()=> navbarView()}
                        className="col s4"
                    >
                        магазин
                    </span>
                    <AddBusinessOutlinedIcon />
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
           
        </AppBar>
    )
}

export default Navbar