import React, {FC, ReactElement, useReducer} from 'react'
import { render, RenderOptions} from '@testing-library/react'

import { store } from '../store'
import { Provider } from 'react-redux'
import { deviceModalReducer, init, initialState } from '../store/reactReducer/deviceModalReducer'
import { DeviceModalDispatch, DeviceModalState } from '../components/modals/DeviceModal/DeviceModal'

const AllTheProviders: FC<{children: React.ReactNode}> = ({children}) => {

    // const [state, dispatch] = useReducer(authFormReducer, initialState, init)
    const [state, dispatch] = useReducer(deviceModalReducer, initialState, init)
    
    return (
        <Provider store={store}>
            <DeviceModalState.Provider value={state}>
                <DeviceModalDispatch.Provider value={dispatch}>
                    {/* <BrowserRouter> */}
                        {/* <AppRouter /> */}
                        {children}
                    {/* </BrowserRouter> */}
                </DeviceModalDispatch.Provider>
            </DeviceModalState.Provider>
        </Provider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})


export * from '@testing-library/react'
export {customRender as render}