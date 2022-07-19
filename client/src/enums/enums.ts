export enum EnumRoute {
    LOGIN = "/login",
    REGISTRATION = "/registration",
    DEVICE_PAGE = "/device_page",
    ADMIN_PAGE = "/admin_page",
    SUPER_ADMIN_PAGE = "/super_admin_page",
    BASKET = "/basket",
    SHOP = "/",
    WRONG_PAGE = "*"
}

export enum ServerQuery {
    DEVICE = '/device',
    AUTH_REGISTRATION = '/user/registration',
    AUTH_LOGIN = '/user/login',
    BRAND = '/brand',
    TYPE = '/type',
    CHECK = '/user/auth',
    REMOVE_COOKIE = '/user/remove_cookie',
    AUTH_REGISTRATION_ADMIN = '/user/registration_admin',
    GET_USERS = '/user/userlist',
    GET_BASKET = '/basket'
}

export enum Tags {
    USER = "USER",
    REG_ADMIN = "REG_ADMIN",
    CREATE_TYPE = "CREATE_TYPE",
    CREATE_BRAND = "CREATE_BRAND",
    CREATE_DEVICE = "CREATE_DEVICE"
}

export enum ValidationResult {
    SUCCESS="success",
    ERROR="error",
    FIRST_ADDITION="firstAddition"
}

export enum formView {
    FORM_REGISTRATION = "registration",
    FORM_LOGIN = "login",
    FORM_SUPER_ADMIN = "super_admin"
}
