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
    type = '/type',
    check = '/user/auth',
    removeCookie = '/user/remove_cookie',
    registrationAdmin = '/user/registration_admin',
    getUsers = '/user/userlist'
}

export enum Tags {
    USER = "USER",
    REG_ADMIN = "REG_ADMIN",
    CREATE_TYPE = "CREATE_TYPE",
    CREATE_BRAND = "CREATE_BRAND"
}
