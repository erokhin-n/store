import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import { useAppDispatch } from "./hooks/hooks";
import { useCheckQuery } from "./store/apiSlice";
import { setEmailinStore, setRole } from "./store/userSlice";


function App() {

    const dispatch = useAppDispatch()

    const {
        data,
        isSuccess,
        isError,
        isFetching
    } = useCheckQuery()

    useEffect(()=> {
        if(isSuccess) {
            dispatch(setRole(data.role))
            dispatch(setEmailinStore(data.email))
        }
    
        if(isError) {
            dispatch(setRole(''))
            dispatch(setEmailinStore(''))
        }
    }, [data])

 
   if(isFetching) {
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
