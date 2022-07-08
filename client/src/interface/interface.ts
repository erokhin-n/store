import { ChangeEvent, Dispatch, FormEvent, SetStateAction, MouseEvent } from "react";

export interface IDevice {
    id: number;
    brandId: number;
    typeId: number;
    img: File;
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
    hideValidationError: boolean;
    setHideValidationError: Dispatch<SetStateAction<boolean>>;
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
    id?: number;
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

export interface IDeviceInfo {
    title: string;
    titleValid?: string;
    description: string;
    descriptionValid?: string;
    id: string;
}

export interface ISelect {
    defaultValue: string;
    valid:string;
    elements: ITypeAndBrand[] | undefined;
    changeValue: (id:number) => void
}

export interface INameAndPriceInput {
    inputView: string;
    element: {value: string, valid: string};
    changeValue: (value: string ) => void
}

export interface IImageInput {
    image: {file:string | Blob, valid: string};
    changeValue: (e:ChangeEvent<HTMLInputElement> ) => void;
}

export interface ITypeIdAndBrandId {
    id: number;
    valid: string;
}

export interface INameAndPrice {
    value: string;
    valid: string;
}

export interface IDeviceInfoComponent {
    info: IDeviceInfo[];
    addInfo: (e:MouseEvent<HTMLButtonElement>) => void;
    changeInfo: (key:string, keyValid:string, value:string, id:string) => void;
    removeInfo: (id:string) => void;
}

export interface IDeviceModalFiels {
    typeIdSelect: any;
    setBrandId: Dispatch<SetStateAction<number | undefined>>;
    brandIdError: string;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    nameError: string;
    price: number;
    setPrice: Dispatch<SetStateAction<number>>;
    priceError: string;
    selectImage: (e:ChangeEvent<HTMLInputElement>) => void;
    addInfo: (e:MouseEvent<HTMLButtonElement>) => void;
    info: IDeviceInfo[];
    changeInfo: (key:string, keyValid:string, value:string, id:string) => void;
    removeInfo: (id:string) => void;
    addDevice: (e:MouseEvent<HTMLButtonElement>) => void;
    deviceFormError:string;
    changeTypeId: any;
}



