import { formView, ValidationResult } from "../enums/enums";
import { MouseEvent } from 'react'

export interface IDevice {
    id: number;
    brandId: number;
    typeId: number;
    img: string | File | undefined; // Изменение здесь
    name: string;
    price: number;
    rating: number;
    info?: [{title: string, description: string}];
    imageFileName?: string; // Добавляем поле для имени файла
}

export interface IDeviceProps<T> {
    device: T;
    basketId?: string;
}

export interface IDevicesProps<T> {
    devices: T;
}

export interface IDevicesResponse<T> {
    count: number;
    rows: T[];
}

export interface IAuthFormState {
    formView: formView.FORM_LOGIN | formView.FORM_REGISTRATION | formView.FORM_SUPER_ADMIN,
    hideValidationError: boolean,
    adminRegMessage: string,
    serverMessage: string | undefined,  
    email: {value: string, validInfo:string, validResult: string},
    password: {value: string, validInfo:string, validResult: string},
}

export type IAuthFormActions = 
    | {type: 'setHideValidationError', payload: boolean}
    | {type: 'setEmail', payload: string}
    | {type: 'setEmailValidationInfo', payload: string}
    | {type: 'setEmailValidationResult', payload: string}
    | {type: 'setPassword', payload: string}
    | {type: 'setPasswordValidationInfo', payload: string}
    | {type: 'setPasswordValidationResult', payload: string}
    | {type: 'setServerMessage', payload: string | undefined}
    | {type: 'setFormView', payload: formView.FORM_LOGIN | formView.FORM_REGISTRATION | formView.FORM_SUPER_ADMIN}
    | {type: 'reset', payload: IAuthFormState}
    | {type: 'superAdminReset'};

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

export interface IDeviceInfo {
    title: string;
    titleValid?: string;
    description: string;
    descriptionValid?: string;
    id: string;
}

export type IDeviceReducerActions = 
    | {type: 'changeTypeIdValue'; payload:number}
    | {type: 'changeTypeIdValid'; payload:string}
    | {type: 'changeBrandIdValue'; payload:number}
    | {type: 'changeBrandIdValid'; payload:string}
    | {type: 'changeNameValue'; payload: string}
    | {type: 'changeNameValid'; payload: string }
    | {type: 'changePriceValue'; payload: string}
    | {type: 'changePriceValid'; payload: string}
    | {type: 'selectImage'; payload: {value: string | Blob, valid: string}}
    | {type: 'addInfo'; payload: IDeviceInfo[]}
    | {type: 'changeTitle'; payload: {value: string, id: string, valid: string}}
    | {type: 'changeDescription'; payload: {value: string, id: string, valid: string}}
    | {type: 'removeInfo'; payload: string}
    | {type: 'reset'; payload: IDeviceModalState};
    
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

export interface IDeviceFormFields {
    sendDeviceForm: () => void
}

export interface IAuthFormFields {
    changeEmail: (e:string) => void;
    changePassword: (e:string) => void;
    handleClick: (e:MouseEvent<HTMLButtonElement>) => void;
}

export interface ITypeAndBrandModal {
    value: string;
    valid: ValidationResult.ERROR | ValidationResult.FIRST_ADDITION | ValidationResult.SUCCESS;
    serverInfo: string;
}

export interface IBasketDevice<T> {
    device: T;
    basketId?: string;
    count?: number;
}

export interface IBasketResponse {
    id: string;
    basketId: string;
    deviceId: string;
}

export interface MuiNavLinkProps {
    to: string;
    onClick?: () => void;
    icon: React.ReactNode;
    name: string;
}