import { useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import { useAppDispatch } from "./hooks/hooks";
import { useCheckQuery } from "./store/apiSlice/userSlice";
import { useGetAllTypesQuery } from "./store/apiSlice/typeSlice";
import { removeRoleAndEmail, setEmailinStore, setRole } from "./store/store/userStore";
import { setTypes } from "./store/store/deviceStore";
import { EnumRoute } from "./enum/enum";


function App() {

    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;


