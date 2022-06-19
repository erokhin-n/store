import { useEffect, useMemo, useState } from "react"
import { useSortUsers } from "../../hooks/useSortUsers"
import { IDataUserResponse } from "../../interface/interface"
import { useUserListQuery } from "../../store/apiSlice"
import UserItem from "./UserItem"

const UserList = () => {

    const {data} = useUserListQuery()

    useEffect(()=> {
        setUsers(data)
    },[data])

    const [filterRole, setFilterRole] = useState<string | ''>('')
    const [alphabetOrder, setAlphabetOrder] = useState<string | ''>('')
    const [users, setUsers] = useState<IDataUserResponse[] | undefined>(undefined)
    const [letterFilter, setLetterFilter] = useState<string>('')

    let sortedUsers = useSortUsers(users, filterRole, alphabetOrder, letterFilter)
    
    // console.log(data)
    // console.log(users)

    return (
        <div>
            <select onChange={e => setFilterRole(e.target.value)}>
                <option value={''}>все роли</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
            </select>

            <select onChange={e => setAlphabetOrder(e.target.value)}>
                <option value={''}>без сортировки</option>
                <option value="A-Z">A-Я</option>
                <option value="Z-A">Я-А</option>
            </select>

            <input 
                type="text"
                value={letterFilter}
                onChange={e => setLetterFilter(e.target.value)} 
            />
        { 
            sortedUsers?.map((user:any) => 
                <UserItem key={user.email} user={user}/>   
            ) 
        }
        </div>
    )
}

export default UserList