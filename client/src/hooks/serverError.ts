export const serverErrorHandler = (error:any) => {

    if (error) {
        
        if ('status' in error) {
            console.log('its work!')
            error = 'error' in error ? 
            error.error : 
                JSON.stringify(error.data)
            return error.split(":")[1].replace(/[\\\}]/gi, '')
        } else {
            error = error.message
            return error.split(":")[1].replace(/[\\\}]/gi, '')
        }
    } else {
        return false
    }
}