import { FC } from "react"

const ErrorModal:FC<{error:string}> = ({error}) => {

    return (
        <div>
            {error}
        </div>
    )
}

export default ErrorModal