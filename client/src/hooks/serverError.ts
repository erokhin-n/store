import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"


export const serverErrorHandler = (error: any) => {

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