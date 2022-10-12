import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { PagesEnum } from "../../enums/enums"
import { useCheckQuery, useRemoveCookieMutation } from "../../store/apiSlice/userSlice"
import { LoginActions } from "../../App"
import { initialState } from "../../store/reactReducer/authFormReducer"

const Navbar = () => {

    const [removeCookie] = useRemoveCookieMutation()

    const {data, isError,isSuccess, isLoading} = useCheckQuery()

    const dispatch = useContext(LoginActions)

    const [navbarVisible, setNavbarVisible] = useState<boolean>(false)

    const logout = () => {
        removeCookie()
        dispatch!({type: 'reset', payload: initialState})
    }

    const showNavbar = ()=> {
        setNavbarVisible(!navbarVisible)
    }

    if(isLoading){
        return <h3>loading navbar...</h3>
    }

    return (
        <div className={navbarVisible ? "navbar" : "navbar_hidden"}>
            <div 
                className="navbar_button"
                onClick={()=> showNavbar()}
            >
                |||
            </div>
            {data?.role ?
                <NavLink
                    // className={"navbarElement"}
                    to={PagesEnum.ENTER}
                    onClick={() => logout()}
                >
                    выйти        
                </NavLink>
                :
                <NavLink
                    // className={"navbarElement"}
                    to={PagesEnum.ENTER}
                >
                    войти
                </NavLink>
            }
            <NavLink
                // className={"navbarElement"}
                to={PagesEnum.SHOP}
            >
                магазин
            </NavLink>
            {(data?.role ===  "ADMIN" ) && 
                <NavLink
                    // className={"navbarElement"} 
                    to={PagesEnum.ADMIN_PAGE}
                >
                    админ панель
                </NavLink>
            }
            {(data?.role === "SUPER_ADMIN") && 
                <NavLink
                    // className={"navbarElement"} 
                    to={PagesEnum.SUPER_ADMIN_PAGE}
                >
                    super admin page
                </NavLink>
            }
            {(data?.role === "USER") && 
                <NavLink
                    // className={"navbarElement"} 
                    to={PagesEnum.BASKET}
                >
                    корзина
                </NavLink>
            }
            <div>{data?.email}</div>
        </div>
    )
}

export default Navbar