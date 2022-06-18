import { useUserListQuery } from "../../store/apiSlice"
import UserItem from "./UserItem"

const UserList = () => {

    const {data} = useUserListQuery()

    return (
        <div>
            {/* <select onChange={e => setSort(e.target.value)}>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
            </select> */}
        { 
            data?.map((user:any) => 
                <UserItem key={user.email} user={user}/>   
            ) 
        }
        </div>
    )
}

export default UserList