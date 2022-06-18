import { FC } from "react"
import { IDataUserResponse } from "../../interface/interface"

const UserItem:FC<{user:IDataUserResponse}> = ({user}) => {
    return (
        <div>{user.id}. {user.email} || {user.role}</div>
    )
}

export default UserItem