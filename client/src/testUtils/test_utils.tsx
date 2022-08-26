import React, {FC, ReactElement, useReducer} from 'react'
import { render, RenderOptions} from '@testing-library/react'

import { LoginActions, LoginState } from '../App'
import { authFormReducer, init, initialState } from '../store/reactReducer/authFormReducer'
import { store } from '../store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PagesEnum } from '../enums/enums'
import Shop from '../pages/Shop'
import AppRouter from '../components/AppRouter'

const AllTheProviders: FC<{children: React.ReactNode}> = ({children}) => {

    const [state, dispatch] = useReducer(authFormReducer, initialState, init)
    
    return (
        <Provider store={store}>
            <LoginState.Provider value={state}>
                <LoginActions.Provider value={dispatch}>
                    <BrowserRouter>
                        <AppRouter />
                        {children}
                    </BrowserRouter>
                </LoginActions.Provider>
            </LoginState.Provider>
        </Provider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})


export * from '@testing-library/react'
export {customRender as render}