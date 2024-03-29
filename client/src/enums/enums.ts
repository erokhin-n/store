export enum PagesEnum {
    ENTER = "/enter",
    PRODUCT_CARD = "/product_card",
    ADMIN_PAGE = "/admin_page",
    SUPER_ADMIN_PAGE = "/super_admin_page",
    BASKET = "/basket",
    SHOP = "/",
    WRONG_PAGE = "*"
}

export enum ServerQuery {
    DEVICE = '/device',
    PRODUCT_CARD = '/device/product_card',
    AUTH_REGISTRATION = '/user/registration',
    AUTH_LOGIN = '/user/login',
    BRAND = '/brand',
    TYPE = '/type',
    CHECK = '/user/auth',
    REMOVE_COOKIE = '/user/remove_cookie',
    AUTH_REGISTRATION_ADMIN = '/user/registration_admin',
    GET_USERS = '/user/userlist',
    GET_BASKET = '/basket',
    ADD_DEVICE = '/basket/add_device',
    GET_BASKET_NUMBER = '/basket/get_basket_number',
    GET_BASKET_DEVICE = '/basket/get_basket_device',
    DELETE_PICTURE = '/device/delete_picture'
}

export enum Tags {
    USER = "USER",
    REG_ADMIN = "REG_ADMIN",
    CREATE_TYPE = "CREATE_TYPE",
    CREATE_BRAND = "CREATE_BRAND",
    CREATE_DEVICE = "CREATE_DEVICE",
    GET_BASKET_DEVICES = "GET_BASKET_DEVICES",
    DELETE_DEVICE = "DELETE_DEVICE"
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
