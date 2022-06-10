import {  IErrorFromServer, IErrorValidation } from "../interface/interface"

const ErrorModal = ({errors}:IErrorValidation | IErrorFromServer) => {

    let message

    if(typeof(errors) === "string") {
        message = errors
    }
    else if(errors!.ref!.name === "email") {
        switch(errors!.type){
            case("required"):
                message = "почта обязательна для заполнения"
                break;
            case("maxLength"):
                message = "превышена допустимая длинна почты"
                break;
            case("pattern"):
                message = "у почты недопустимые символы"
        }
    } else if(errors!.ref!.name === "password") {
        switch(errors!.type){
            case("required"):
                message = "пароль обязателен для заполнения"
                break;
            case("maxLength"):
                message = "превышена допустимая длинна пароля"
                break;
            case("pattern"):
                message = "у пароля недопустимые символы"
        }
    } 

   
    

    return (
        <div>
            {message}
        </div>
    )
}

export default ErrorModal