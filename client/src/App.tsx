import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { EnumRoute } from "./enum/enum";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Shop from "./pages/Shop";
import WrongRoutePage from "./pages/WrongRoutePage";


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={EnumRoute.Shop} element={<Shop />} />
                <Route path={EnumRoute.Login} element={<Auth />} />
                <Route path={EnumRoute.Registration} element={<Auth />} />
                <Route path={EnumRoute.DevicePage} element={<DevicePage />} />
                <Route
                    path="*"
                    element={<WrongRoutePage />}
                />
            </Routes>
      </BrowserRouter>
    );
}

export default App;
