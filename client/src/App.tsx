import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Shop from "./pages/Shop";
import WrongRoutePage from "./pages/WrongRoutePage";


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Shop />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/device_page/:id" element={<DevicePage />} />
                <Route
                    path="*"
                    element={<WrongRoutePage />}
                />
            </Routes>
      </BrowserRouter>
    );
}

export default App;
