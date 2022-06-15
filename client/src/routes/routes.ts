import { EnumRoute } from "../enum/enum";
import AdminPage from "../pages/AdminPage";
import DevicePage from "../pages/DevicePage";
import Shop from "../pages/Shop";
import Basket from "../pages/Basket";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import SuperAdminPage from "../pages/SuperAdminPage";

export const adminRoutes = [
    {path:EnumRoute.AdminPage, element:AdminPage},
]

export const userRoutes = [
    {path: EnumRoute.Basket, element:Basket},
]

export const publicRoutes = [
    {path: EnumRoute.Shop, element: Shop},
    {path: EnumRoute.Login, element: Login},
    {path: EnumRoute.Registration, element: Registration},
    {path: EnumRoute.DevicePage, element: DevicePage},
]

export const superAdminRoutes = [
    {path:EnumRoute.SuperAdminPage, element:SuperAdminPage},
]