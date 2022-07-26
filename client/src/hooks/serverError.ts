export const serverError = (error:any) => {

    if (error) {
        if ('status' in error) {
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