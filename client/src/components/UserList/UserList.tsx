import { useUserListQuery } from "../../store/apiSlice"
import UserItem from "./UserItem"

const UserList = () => {

    const {data, isError} = useUserListQuery()

    if(isError) {
        return <h1>hui!</h1>
    }

    return (
        <div>
            {data?.map(user => 
                <UserItem key={user.email} user={user}/>   
            )}
        </div>
    )
}

export default UserList