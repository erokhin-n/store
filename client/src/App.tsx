import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import { useAppDispatch } from "./hooks/hooks";
import { useCheckMutation } from "./store/apiSlice/userSlice";
import { useGetAllTypesQuery } from "./store/apiSlice/typeSlice";
import { removeRoleAndEmail, setEmailinStore, setRole } from "./store/store/userStore";
import { setTypes } from "./store/store/deviceStore";


function App() {

    const dispatch = useAppDispatch()

    const [check, {
        data,
        isLoading,
        isSuccess:checkSuccess,
        isError:checkError,
        isUninitialized 
    }] = useCheckMutation()

    const {data:types} = useGetAllTypesQuery()

    useEffect(()=> {
        if(types) {
            dispatch(setTypes(types))
        }
    },[types])

    useEffect(()=> {
        check()
    },[])

    useEffect(()=> {
        if(checkSuccess) {
            dispatch(setRole(data!.role))
            dispatch(setEmailinStore(data!.email))
        }
    
        if(checkError) {
            dispatch(removeRoleAndEmail)
        }
    }, [data])

    if(isUninitialized ) {
        return <h3>ждем запуска мутации</h3>
    }

    if(isLoading ) {
        return <h3>грузим</h3>
    }

    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;


