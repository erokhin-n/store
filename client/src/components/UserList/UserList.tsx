import { useEffect } from "react"

const UserList = () => {
    const  getUsers = async () => {
        const users:any = await fetch('http://localhost:3000/api/user/userlist')
        const jsonn = await users.json()
        console.log(jsonn)
    }

    useEffect(()=> {
        getUsers()
    },[])


    return (
        <div>
            тут будет UserList
        </div>
    )
}

export default UserList