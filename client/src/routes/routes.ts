import { EnumRoute } from "../enum/enum";
import AdminPage from "../pages/AdminPage";
import Auth from "../pages/Auth";
import DevicePage from "../pages/DevicePage";
import Shop from "../pages/Shop";
import Basket from "../pages/Basket";
import WrongRoutePage from "../pages/WrongRoutePage";

export const adminRoutes = [
    {path:EnumRoute.AdminPage, element:AdminPage},
    {path: EnumRoute.Shop, element: Shop},
    {path: EnumRoute.Login, element: Auth},
    {path: EnumRoute.Registration, element: Auth},
    {path: EnumRoute.DevicePage, element: DevicePage},
]

export const userRoutes = [
    {path: EnumRoute.Basket, element:Basket},
    {path: EnumRoute.Shop, element: Shop},
    {path: EnumRoute.Login, element: Auth},
    {path: EnumRoute.Registration, element: Auth},
    {path: EnumRoute.DevicePage, element: DevicePage},
]

export const publicRoutes = [
    {path: EnumRoute.Shop, element: Shop},
    {path: EnumRoute.Login, element: Auth},
    {path: EnumRoute.Registration, element: Auth},
    {path: EnumRoute.DevicePage, element: DevicePage},
    // {path: EnumRoute.wrongPage, element: WrongRoutePage},
]