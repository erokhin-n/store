import {React, useReducer} from 'react'
import { render, fireEvent } from '@testing-library/react';
import AuthForm from './AuthForm'
import { LoginState } from '../../App';
import { authFormReducer, init, initialState } from "../../store/reactReducer/authFormReducer";
import { formView } from '../../enums/enums';
import { ValidationResult } from '../../enums/enums';

const testState = {
    formView: formView.FORM_LOGIN,
    serverMessage: '',
    hideValidationError: false,
    adminRegMessage: '',
    email: {value: '', validInfo:ValidationResult.FIRST_ADDITION, validResult: ValidationResult.FIRST_ADDITION},
    password: {value: '', validInfo:ValidationResult.FIRST_ADDITION,validResult: ValidationResult.FIRST_ADDITION},
}

test('test for input', () => {


    const handleChange = jest.fn()
    const {container} = render(
        <LoginState.Provider store={testState}>
            {/* <LoginAction.Provider store={testDispatch}> */}
                <AuthForm />
            {/* </LoginAction.Provider> */}
        </LoginState.Provider>    
        )
	const input = container.firstChild
	fireEvent.change(input, {target: {value: 'a'}})

    expect(input.value).toBe('a')
  
  })