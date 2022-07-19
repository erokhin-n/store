import { EnumRoute } from "../enums/enums";
import AdminPage from "../pages/AdminPage/AdminPage";
import DevicePage from "../pages/DevicePage";
import Shop from "../pages/Shop";
import Basket from "../pages/Basket";
import Login from "../pages/Enter";
import SuperAdminPage from "../pages/SuperAdminPage/SuperAdminPage";

export const adminRoutes = [
    {path:EnumRoute.ADMIN_PAGE, element:AdminPage},
]

export const userRoutes = [
    {path: EnumRoute.BASKET, element:Basket},
]

export const publicRoutes = [
    {path: EnumRoute.SHOP, element: Shop},
    {path: EnumRoute.LOGIN, element: Login},
    {path: EnumRoute.DEVICE_PAGE, element: DevicePage},
]

export const superAdminRoutes = [
    {path:EnumRoute.SUPER_ADMIN_PAGE, element:SuperAdminPage},
]