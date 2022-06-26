import { ChangeEvent, Dispatch, FormEvent, FormEventHandler, SetStateAction } from "react";

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
    error_server_message: string | undefined;
    loginInformation: "login" | "registration" | "super_admin";
    adminRegMessage?: string | '';
    setAdminRegMessage?: Dispatch<SetStateAction<string>>;
}


export interface IAuthData {
    email: string;
    password: string;
}

export interface IDataUserResponse {
    role: string;
    email: string;
    id?:string;
}

export interface ITypeAndBrand {
    name: string;
}

export interface IMessage {
    message: string;
}


export interface IAuthFormFields {
    sendForm: (e:FormEvent<HTMLButtonElement>) => void;
    email: string;
    changeEmail: (e:string) => void;
    password: string;
    changePassword:(e:string) => void;
    emailError:string;
    setEmailError: Dispatch<SetStateAction<string>>;
    passwordError:string;
    setPasswordError:Dispatch<SetStateAction<string>>;
    serverError:string | undefined;
    submitError: string;
    loginInformation: "login" | "registration" | "super_admin";
    adminRegMessage?: string | '';
}

export interface IDeviceStoreInitialState {
    brands: ITypeAndBrand[];
    types: ITypeAndBrand[];
    devices: IDevice[];
}


