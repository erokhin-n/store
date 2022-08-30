import React from 'react'
import {render, fireEvent, waitFor, waitForElementToBeRemoved} from '../../testUtils/test_utils'
import AppRouter from '../AppRouter'
import AuthForm from './AuthForm'
import AuthFormFields from './AuthFormFields'
import {screen, getByRole} from '@testing-library/dom'
import '@testing-library/jest-dom'

import { rest } from 'msw'

import { setupServer } from 'msw/node'
import { useLoginMutation } from '../../store/apiSlice/userSlice'
import { act } from 'react-dom/test-utils'
import { unmountComponentAtNode } from 'react-dom'
import SuperAdminPage from '../../pages/SuperAdminPage/SuperAdminPage'

// const server = setupServer(

//  	// rest.post('http://localhost:5000/api/user/login', (req, res, ctx) => {
// 	// 	return res(
// 	// 		ctx.json({message: 'privet!'})
// 	// 	)
//  	// }),
//   	rest.get('http://localhost:5000/api/user/auth', (req, res, ctx) => {
// 		return res(
// 			ctx.json("123-234-44412321")
//    		)
//   	}),
// 	rest.get('http://localhost:5000/api/device', (req, res, ctx)=> {
// 		return res(
// 			ctx.json({message: "no devices"})
// 		)
// 	})
// )


// beforeAll(() => {
// 	server.listen()
// })

// afterEach(() => {
// 	server.resetHandlers()
// })

// afterAll(() => server.close())


test('test for AuthInputs', async () => {

	// server.use(
	// 	rest.post('http://localhost:5000/api/user/login', (req, res, ctx) => {
	// 		return res(
	// 			ctx.status(406),
	// 			ctx.json({message: 'poshel ti na hui'})
	// 		)
	// 	}),
	//   )

	render(<AuthForm />)
   	
    const emailInput = screen.getByPlaceholderText('введите почту')
    const passwordInput = screen.getByPlaceholderText('введите пароль')
    const submitButton = screen.getByRole('button')
	// const changeFormView = screen.getByText('зарегистрируйтесь')

	const mail:string =  's_adm@mail.com'

	// fireEvent.click(changeFormView)
	fireEvent.change(emailInput!, {target: {value: mail}})
	fireEvent.change(passwordInput!, {target: {value: 'passwdord'}})
	fireEvent.click(submitButton)
	
	const serverError = await waitFor(()=> screen.findByTestId('errorId'))
	expect(serverError).toHaveTextContent('неправльный пароль')
})

