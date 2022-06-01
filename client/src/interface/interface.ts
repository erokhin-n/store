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
    email: string | undefined;
    password: string | undefined;
    changeEmail: (e:string)=> void;
    changePassword: (e:string) => void;
    sendForm: (e:React.FormEvent<HTMLFormElement>) => void;
    isLogin: boolean;
}

export  interface ILogin {
    email: string | undefined;
    password: string | undefined;
}

export interface IToken {
    token: string | undefined;
}