export const validation = (
    input:string,
    str:string,
    setFormError:any,
    formError:any) => {
    if(input === "email") {
        if(str.length === 0) {
            setFormError({...formError, email: 'слишком длинно!'})
        } else if(str.search(/[\s]/) !== -1) {
            setFormError({...formError, email: 'мальчик, отвали со своим этим самым... пробелом'})
        } else {
            setFormError({...formError, email: ''})
        }
    }

    if(input === "password") {
        if(str.length > 5) {
            setFormError({...formError, password: 'пароль огромен!'})
        } else if(str.search(/[\s]/) !== -1) {
            setFormError({...formError, password:'мальчик, пароли не пробелятся!'})
        } else {
            setFormError({...formError, password: ''})
        }
    }
}