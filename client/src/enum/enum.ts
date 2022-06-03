export enum EnumRoute {
    Login = "/login",
    Registration = "/registration",
    DevicePage = "/device_page",
    AdminPage = "/admin_page",
    Basket = "/basket",
    Shop = "/",
    WrongPage = "*"
}

export enum ServerQuery {
    devices = '/api/device',
    registration = '/api/user/registration',
    login = '/api/user/login',
    brand = '/api/brand',
    check = '/api/user/auth',
    removeCookie = '/api/user/remove_cookie'
}
