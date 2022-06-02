import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import WrongRoutePage from "../pages/WrongRoutePage"
import { adminRoutes, publicRoutes, userRoutes } from "../routes/routes"

const AppRouter = () => {

    const role = useSelector((state:any) => state.user.role)

    let routes

    if(role === "ADMIN") {
        routes = adminRoutes.map(route => 
            <Route path={route.path} element={<route.element />} />    
        )
    } else if(role === "USER") {
        routes = userRoutes.map(route => 
            <Route path={route.path} element={<route.element />} />    
        )
    } else {
        routes = publicRoutes.map(route => 
            <Route path={route.path} element={<route.element />} />    
        )
    }

    return (
        <Routes>
            {routes}
            <Route
                path="*"
                element={<WrongRoutePage />}
            />
        </Routes>
    )
}

export default AppRouter