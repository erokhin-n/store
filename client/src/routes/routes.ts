import { PagesEnum } from "../enums/enums";
import AdminPage from "../pages/AdminPage/AdminPage";
import DevicePage from "../pages/DevicePage";
import Shop from "../pages/Shop";
import Basket from "../pages/Basket";
import Enter from "../pages/Enter";
import SuperAdminPage from "../pages/SuperAdminPage/SuperAdminPage";

export const adminRoutes = [
    {path:PagesEnum.ADMIN_PAGE, element:AdminPage},
]

export const userRoutes = [
    {path: PagesEnum.BASKET, element:Basket},
]

export const publicRoutes = [
    {path: PagesEnum.SHOP, element: Shop},
    {path: PagesEnum.ENTER, element: Enter},
    {path: PagesEnum.DEVICE_PAGE, element: DevicePage},
]

export const superAdminRoutes = [
    {path:PagesEnum.SUPER_ADMIN_PAGE, element:SuperAdminPage},
]