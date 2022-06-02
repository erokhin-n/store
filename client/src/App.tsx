import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import { EnumRoute } from "./enum/enum";
import AdminPage from "./pages/AdminPage";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Shop from "./pages/Shop";
import WrongRoutePage from "./pages/WrongRoutePage";
import { useCheckQuery } from "./store/apiSlice";
import { setRole } from "./store/userSlice";


function App() {

    const dispatch = useDispatch()

    const {
        data: role,
        isLoading,
        isSuccess,
        isError
    } = useCheckQuery()

    useEffect(()=> {
        if (isLoading) {
            console.log('he')
        }
    
        if(isSuccess) {
            dispatch(setRole(role.role))
        }
    
        if(isError) {
            dispatch(setRole(''))
        }
    }, [role])
   

    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
      </BrowserRouter>
    );
}

export default App;
