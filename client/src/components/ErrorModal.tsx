import { FC } from "react"

const ErrorModal:FC<{error:string | undefined}> = ({error}) => {

    return (
        <div>
            {error}
        </div>
    )
}

export default ErrorModal