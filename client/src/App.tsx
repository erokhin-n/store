import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { EnumRoute } from "./enum/enum";
import AdminPage from "./pages/AdminPage";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Shop from "./pages/Shop";
import WrongRoutePage from "./pages/WrongRoutePage";
import { useCheckQuery } from "./store/apiSlice";


function App() {

    const {
        data: role,
        isLoading,
        isSuccess,
        isError
    } = useCheckQuery()

    if (isLoading) {
        return <h3>check...</h3>
    }

    if(isSuccess) {
        console.log(role)
    }

    if(isError) {
        alert('hui vam, shenki!')
    }

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={EnumRoute.Shop} element={<Shop />} />
                <Route path={EnumRoute.Login} element={<Auth />} />
                <Route path={EnumRoute.Registration} element={<Auth />} />
                <Route path={EnumRoute.DevicePage} element={<DevicePage />} />
                <Route path={EnumRoute.AdminPage} element={<AdminPage />} />
                <Route
                    path="*"
                    element={<WrongRoutePage />}
                />
            </Routes>
      </BrowserRouter>
    );
}

export default App;
