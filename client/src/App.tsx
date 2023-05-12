import { createContext, Dispatch, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import { IAuthFormActions, IAuthFormState } from "./interface/interface";
import { authFormReducer, init, initialState } from "./store/reactReducer/authFormReducer";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Footer from "./components/Footer";
import BottomNavigation from '@mui/material/BottomNavigation';


export const LoginState = createContext<IAuthFormState | null>(null)
export const LoginActions = createContext<Dispatch<IAuthFormActions> | null>(null)

export function App() {

    const [state, dispatch] = useReducer(authFormReducer, initialState, init)

    return (
        <LoginState.Provider value={state}>
            <LoginActions.Provider value={dispatch}>
                <BrowserRouter>
                    <CssBaseline />
                    <Navbar />
                    <AppRouter />
                    <Footer />
                </BrowserRouter>
            </LoginActions.Provider>
        </LoginState.Provider>
    );
}




