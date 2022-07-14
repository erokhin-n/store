import {  Dispatch, FormEvent, SetStateAction, MouseEvent } from "react";
import { deviceModalReducer } from "../store/reactReducer/deviceModalReducer";

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

export interface IAuthForm {
    pagesStates: {
        hideValidationError: boolean;
        setHideValidationError: Dispatch<SetStateAction<boolean>>;
        adminRegMessage?: string | '';
        setAdminRegMessage?: Dispatch<SetStateAction<string>>;
    }
    fetchForm: (email: string, password: string) => void;
    loginInformation: "login" | "registration" | "super_admin";
    errorServerMessage: string | undefined;
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
    authFormStates: {
        email: string;
        setEmail: Dispatch<SetStateAction<string>>;
        password: string;
        setPassword:Dispatch<SetStateAction<string>>;
        emailError:string;
        setEmailError: Dispatch<SetStateAction<string>>;
        passwordError:string;
        setPasswordError:Dispatch<SetStateAction<string>>;
        serverError:string | undefined;
        setServerError: Dispatch<SetStateAction<string | undefined>>;
        submitError: string;
        setSubmitError: Dispatch<SetStateAction<string>>;
    }
    loginInformation: "login" | "registration" | "super_admin";
    adminRegStates?: {
        adminRegMessage?: string | '';
        setAdminRegMessage?: Dispatch<SetStateAction<string | ''>>;
    }
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
    setValue: Dispatch<SetStateAction<ITypeIdAndBrandId>>;
}

export interface INameAndPriceInput {
    inputView: string;
    element: {value: string, valid: string};
    setValue: Dispatch<SetStateAction<INameAndPrice>>;
}

export interface IImageInput {
    image: {file:string | Blob, valid: string};
    setValue: Dispatch<SetStateAction<IImage>>;
}

export interface ITypeIdAndBrandId {
    id: number;
    valid: string;
}

export interface INameAndPrice {
    value: string;
    valid: string;
}

export interface IImage {
    file:string | Blob;
    valid:string;
}

export interface IDeviceInfoComponent {
    info: IDeviceInfo[];
    setValue: Dispatch<SetStateAction<IDeviceInfo[]>>;
}

export interface IDeviceFormError {
    status:boolean;
    message: string;
}

export type IDeviceReducerActions = 
    | {type: 'changeTypeId'; payload: {value: number, valid: string}}
    | {type: 'changeBrandId'; payload: {value: number, valid: string}}
    | {type: 'changeName'; payload: {value: string, valid: string}}
    | {type: 'changePrice'; payload: {value: string, valid: string}}
    | {type: 'selectImage'; payload: {value: string | Blob, valid: string}}
    | {type: 'addInfo'; payload: IDeviceInfo[]}
    | {type: 'changeTitle'; payload: {value: string, id: string, valid: string}}
    | {type: 'changeDescription'; payload: {value: string, id: string, valid: string}}
    | {type: 'removeInfo'; payload: string};
    


export interface IDeviceModalState {
    typeId: {value:number, valid: string},
    brandId: {value:number, valid: string},
    name: {value:string, valid: string},
    price: {value:string, valid: string},
    image: {value:string  | Blob, valid: string},
    info: IDeviceInfo[],
}

export interface IBasket {
    id: string;
    userId: string;
}