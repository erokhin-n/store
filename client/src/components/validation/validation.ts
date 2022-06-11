export const validation = (
    input:string,
    str:string,
    setFormErrors:any,
    setFormIsValud:any,
    setErrorInput:any,
    formErrors:any) => {
    if(input === "email") {
        if(str.length > 5) {
            setFormErrors({...formErrors, email: 'слишком длинно!'})
            setFormIsValud(false)
            setErrorInput(input)
        } else if(str.search(/[\s]/) !== -1) {
            setFormErrors({...formErrors, email: 'мальчик, отвали со своим этим самым... пробелом'})
            setFormIsValud(false)
            setErrorInput(input)
        } else {
            setFormErrors({...formErrors, email: ''})
        }
    }

    if(input === "password") {
        if(str.length > 5) {
            setFormErrors({...formErrors, password: 'пароль огромен!'})
            setFormIsValud(false)
            setErrorInput(input)
        } else if(str.search(/[\s]/) !== -1) {
            setFormErrors({...formErrors, password:'мальчик, пароли не пробелятся!'})
            setFormIsValud(false)
            setErrorInput(input)
        } else {
            setFormErrors({...formErrors, password: ''})
        }
    }
}