import { formView } from "../enums/enums";

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


export interface IAuthFormState {
    formView: formView.FORM_LOGIN | formView.FORM_REGISTRATION | formView.FORM_SUPER_ADMIN,
    hideValidationError: boolean,
    adminRegMessage: string,
    serverErrorMessage: string,  
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
    | {type: 'setFormView', payload: formView.FORM_LOGIN | formView.FORM_REGISTRATION | formView.FORM_SUPER_ADMIN}
    | {type: 'reset'}
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
    | {type: 'changeTypeId'; payload: {value: number, valid: string}}
    | {type: 'changeBrandId'; payload: {value: number, valid: string}}
    | {type: 'changeName'; payload: {value: string, valid: string}}
    | {type: 'changePrice'; payload: {value: string, valid: string}}
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
