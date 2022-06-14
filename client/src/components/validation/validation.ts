export const validation:any = (
    input:string,
    str:string,
    setFormError:any,
    formError:any
) => {
    if(input === "email") {
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
            console.log("email: " +str)
            setFormError({...formError, email: 'необходимо заполнить почту в формате: "yourmail@mail.com"'})
        } else {
            setFormError({...formError, email: ''})
        }

    }

    if(input === "password") {
        if(!str.match(/^[A-Za-z]\w{7,14}$/)) {
            console.log("password: " +str)
            setFormError({...formError, password: "пароль должен начинаться с буквы, длинна пароля должна быть от 7 до 16 букв или цифр"})
        } else {
            setFormError({...formError, password: ''})
        }
    }
}