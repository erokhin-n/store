import { Navigate, Route, Routes } from "react-router-dom"
import { useAppSelector } from "../hooks/useDispatchAndSelector"
import WrongRoutePage from "../pages/WrongRoutePage"
import { adminRoutes, publicRoutes, superAdminRoutes, userRoutes } from "../routes/routes"
import { useCheckQuery } from "../store/apiSlice/userSlice"
import Loader from "./Loader/Loader"
import Spinner from "./Spinner/Spinner"
import { Typography } from "@mui/material"

const AppRouter = () => {

    const {data, isLoading} = useCheckQuery()
    

    if(isLoading){
        return <Typography>'wait please'</Typography>
    }
    
    const routes = publicRoutes.map(route => 
        <Route 
            path={route.path} 
            element={<route.element />} 
            key={route.path}
        />    
    )

    let authRoutes

    if(data?.role === "ADMIN") {
        authRoutes = adminRoutes.map(route => 
            <Route 
                path={route.path} 
                element={<route.element />} 
                key={route.path}
            />    
        )
    } else if(data?.role === "USER") {
        authRoutes = userRoutes.map(route => 
            <Route 
                path={route.path} 
                element={<route.element />} 
                key={route.path}
            />    
        )
    } else if (data?.role === "SUPER_ADMIN") {
        authRoutes = superAdminRoutes.map(route => 
            <Route 
                path={route.path} 
                element={<route.element />} 
                key={route.path}
            />     
        )
    }
    console.log(data)
    return (
        <Routes>
            {routes}
            {authRoutes}
            <Route 
                path="*" 
                element={<Navigate to="/not-found" />} 
            />


        </Routes>
    )
}

export default AppRouter