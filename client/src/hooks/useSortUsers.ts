import { useMemo } from "react"
import { IDataUserResponse } from "../interface/interface"

// export const useFilterRoleUsers = (users:IDataUserResponse[] | undefined, filterRole:string) => {
//     console.log('role filter work!')
//     const filteredRoleUsers = useMemo(()=> {
//         if(filterRole) {
//             return users!.filter(user => user.role === filterRole)
//         }    
//         return users
//     },[users, filterRole])
//     return filteredRoleUsers
// }

// export const useAlphabetOrder = (
//     users:IDataUserResponse[] | undefined, 
//     filterRole:string, 
//     alphabetOrder:string) => {
//     console.log('Alphabet order work!')
//     const filterRoleUsers = useFilterRoleUsers(users, filterRole) 

//     return users
// }

// export const useSortUsers = (
//     users:IDataUserResponse[] | undefined, 
//     filterRole:string, 
//     alphabetOrder:string, 
//     letterFilter:string) => {
//     console.log('ALL FILTER WORKS!')
//     const filteredAndOrderedUsers = useAlphabetOrder(users, filterRole, alphabetOrder)

//     const sortedUsers = useMemo(()=> {
//         if(filteredAndOrderedUsers) {
//             return filteredAndOrderedUsers!.filter((user:IDataUserResponse) => 
//             user.email.toLowerCase().includes(letterFilter.toLowerCase()))
//         }
//         return users
//     }, [users, letterFilter])
//     return sortedUsers
// }

export const useSortUsers = (
    users:IDataUserResponse[] | undefined, 
    filterRole:string, 
    alphabetOrder:string, 
    letterFilter:string) => {
    
    
    const sortPosts = useMemo(()=> {
        if(users) {
            let sortedUsers: any

            if(filterRole) {
                sortedUsers = users.filter((user:IDataUserResponse) => user.role === filterRole)
            } else {
                sortedUsers = users
            }
            if(letterFilter) {
                if(sortedUsers) {
                    sortedUsers = sortedUsers.filter((user:IDataUserResponse) => 
                    user.email.toLowerCase().includes(letterFilter.toLowerCase()))
                } else {
                    sortedUsers = users.filter((user:IDataUserResponse) => 
                    user.email.toLowerCase().includes(letterFilter.toLowerCase()))
                }

            }
            if(alphabetOrder === "A-Z") {
                if(sortedUsers) {
                    sortedUsers = [...sortedUsers].sort((a:any, b:any) => a.email.localeCompare(b.email))
                } else {
                    sortedUsers = [...users].sort((a:any, b:any) => a.email.localeCompare(b.email))
                }

                // if(sortedUsers) {
                //     if(alphabetOrder === "A-Z") {
                //         sortedUsers = sortedUsers.sort((a:any, b:any) => a.email.localeCompare(b.email))
                //     } else if(alphabetOrder === "Z-A") {
                //         sortedUsers = sortedUsers.sort((a:any, b:any) => b.email.localeCompare(a.email))
                //     } else {
                //         sortedUsers = users
                //     }
                   
                // } 
            }
            if(alphabetOrder === "Z-A") {
                if(sortedUsers) {
                    sortedUsers = [...sortedUsers].sort((a:any, b:any) => b.email.localeCompare(a.email))
                } else {
                    sortedUsers = [...users].sort((a:any, b:any) => b.email.localeCompare(a.email))
                }

            }
            return sortedUsers         
        } 

        
    },[users, filterRole, alphabetOrder, letterFilter])

    return sortPosts
}