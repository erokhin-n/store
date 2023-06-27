import Typography from "@mui/material/Typography"
import { FC } from "react"

const ErrorModal:FC<{error:string}> = ({error}) => {

    return (
        <Typography
            variant={"subtitle2"}
            
        >
            {error}
        </Typography>
    )
}

export default ErrorModal