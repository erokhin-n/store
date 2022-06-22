export enum EnumRoute {
    Login = "/login",
    Registration = "/registration",
    DevicePage = "/device_page",
    AdminPage = "/admin_page",
    SuperAdminPage = "/super_admin_page",
    Basket = "/basket",
    Shop = "/",
    WrongPage = "*"
}

export enum ServerQuery {
    devices = '/device',
    registration = '/user/registration',
    login = '/user/login',
    brand = '/brand',
    check = '/user/auth',
    removeCookie = '/user/remove_cookie',
    registrationAdmin = '/user/registration_admin',
    getUsers = '/user/userlist'
}

export enum Tags {
    REG_ADMIN = "REG_ADMIN"
}
