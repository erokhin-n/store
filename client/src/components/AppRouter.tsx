import { Route, Routes } from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"
import WrongRoutePage from "../pages/WrongRoutePage"
import { adminRoutes, publicRoutes, superAdminRoutes, userRoutes } from "../routes/routes"

const AppRouter = () => {

    const role = useAppSelector((state) => state.user.role)

    const routes = publicRoutes.map(route => 
        <Route 
            path={route.path} 
            element={<route.element />} 
            key={route.path}
        />    
    )

    let authRoutes

    if(role === "ADMIN") {
        authRoutes = adminRoutes.map(route => 
            <Route 
                path={route.path} 
                element={<route.element />} 
                key={route.path}
            />    
        )
    } else if(role === "USER") {
        authRoutes = userRoutes.map(route => 
            <Route 
                path={route.path} 
                element={<route.element />} 
                key={route.path}
            />    
        )
    } else if (role === "SUPER_ADMIN") {
        authRoutes = superAdminRoutes.map(route => 
            <Route 
                path={route.path} 
                element={<route.element />} 
                key={route.path}
            />     
        )
    }

    return (
        <Routes>
            {routes}
            {authRoutes}
            <Route
                path="*"
                element={<WrongRoutePage />}
            />
        </Routes>
    )
}

export default AppRouter