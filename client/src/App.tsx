import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import { useAppDispatch } from "./hooks/hooks";
import { useCheckMutation } from "./store/apiSlice/userSlice";
import { setEmailinStore, setRole } from "./store/userStore";


function App() {

    const dispatch = useAppDispatch()

    const [check, {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCheckMutation()

    useEffect(()=> {
        check()
    },[])

    useEffect(()=> {
        if(isSuccess) {
            dispatch(setRole(data!.role))
            dispatch(setEmailinStore(data!.email))
        }
    
        if(isError) {
            dispatch(setRole(''))
            dispatch(setEmailinStore(''))
        }
    }, [data])

 
    if( isLoading) {
        return <h3>fetching</h3>
    }

    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
