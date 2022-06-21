import { useMemo } from "react"
import { IDataUserResponse } from "../interface/interface"

export const useSortUsers = (
    users:IDataUserResponse[] | undefined, 
    filterRole:string, 
    alphabetOrder:string, 
    letterFilter:string) => {
    
    const sortPosts = useMemo(()=> {
        if(users) {
            let sortedUsers:IDataUserResponse[]

            sortedUsers = !filterRole ? users : 
                users.filter((user:IDataUserResponse) => 
                user.role === filterRole)

            if(letterFilter) {
                sortedUsers = ((sortedUsers) ? sortedUsers : users)
                .filter((user:IDataUserResponse) => 
                    user.email.toLowerCase().includes(letterFilter.toLowerCase()))
            }

            if(alphabetOrder === "A-Z") {
                sortedUsers = (sortedUsers ? [...sortedUsers] : [...users])
                .sort((a:IDataUserResponse, b:IDataUserResponse) => 
                    a.email.localeCompare(b.email))
            }

            if(alphabetOrder === "Z-A") {
                sortedUsers = (sortedUsers ? [...sortedUsers] : [...users])
                .sort((a:IDataUserResponse, b:IDataUserResponse) => 
                    b.email.localeCompare(a.email))
            }
            return sortedUsers         
        } 
    },[users, filterRole, alphabetOrder, letterFilter])
    return sortPosts
}