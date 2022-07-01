export const deviceInfoValidation = (str:string) => {
    return str + !/^([a-zA-Zа-яА-Я0-9]+\s)*[a-zA-Zа-яА-Я0-9]+$/.test(str)
}



// export const deviceInfoValidation = (info:any, infoError:any,setInfoError:any) => {

//     info.map((i:any) => {
//         setInfoError([...infoError,{
//             id: i.id, 
//             titleError: (!/^([a-zA-Zа-яА-Я0-9]+\s)*[a-zA-Zа-яА-Я0-9]+$/.test(i.title)),
//             descriptionError: (!/^([a-zA-Zа-яА-Я0-9]+\s)*[a-zA-Zа-яА-Я0-9]+$/.test(i.description))
//         }])
//     })
// }