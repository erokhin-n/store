export interface IDevice {
    id: number;
    brandId: number;
    typeId: number;
    img: string;
    name: string;
    price: number;
    rating: number;
}

export interface IDeviceProps<T> {
    device: T;
}

export interface IDevicesProps<T> {
    devices: T;
}

export interface IDevicesResponse<T> {
    count: number;
    rows: T[];
}

export interface IAuthFormProps {
    fetchForm: (email: string, password: string) => void;
    isLogin: boolean;
    error_server_message: string | undefined;
}

export interface IRole {
    role: string;
}

export interface IAuthData {
    email: string;
    password: string;
}

export interface IDataUserResponse {
    role: string;
    email: string;
}

export interface ITypeAndBrand {
    name: string;
}

export interface IMessage {
    massage: string;
}

export interface IFormError {
    email: string;
    password: string;
}

