import { FC } from "react"

const ErrorModal:FC<{error:string}> = ({error}) => {

    return (
        <div data-testid="errorId">
            {error}
        </div>
    )
}

export default ErrorModal