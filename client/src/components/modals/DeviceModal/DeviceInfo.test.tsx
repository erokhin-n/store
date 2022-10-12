import {render, waitFor} from '../../../testUtils/test_utils_device'
import {screen} from '@testing-library/dom'
import '@testing-library/jest-dom'
import DeviceModal from './DeviceModal'
import userEvent from '@testing-library/user-event'

function setup(tsx:any) {
    return {
      user: userEvent.setup(),
      ...render(tsx),
    }
}

const forbidden_symbols = ['@','!','#','$','%','^','&','*','(', ')',' ', '_', '-','=', "<", '>', '\[','\]','\{', '\}','|','\\',':', ':',"\'",'?','/','`', '~']

// let characters = [];

// for (let i=32; i<127; i++)
//   	characters.push( String.fromCharCode(i) );

// console.log(characters)

forbidden_symbols.forEach(async(symbol) => {
	test('forbidden symbols in title', async () => {

		const {user} = setup(<DeviceModal />)

		await user.tripleClick(screen.getByText(/добавить информацию/i)) 

		const titles = screen.getAllByPlaceholderText('введите заголовок')
		const titleContainer1 = screen.getByTestId('titleContainer1')

		await waitFor(()=>user.type(titles[1], symbol))	
	
		expect(await waitFor(()=>titleContainer1)).toHaveTextContent("title err")
	})

	
})

forbidden_symbols.forEach(async(symbol) => {
	test('forbidden symbols in description', async () => {

		const {user} = setup(<DeviceModal />)

		await user.tripleClick(screen.getByText(/добавить информацию/i)) 

		const descriptions = screen.getAllByPlaceholderText('введите описание')
		const descriptionContainer1 = screen.getByTestId('descriptionContainer1')

		await waitFor(()=>user.type(descriptions[1], symbol))	
	
		expect(await waitFor(()=>descriptionContainer1)).toHaveTextContent("description err")
	})

	
})

// test('test for DeviceInfo', async ()=> {
        
//     const {user} = setup(<DeviceModal />)

//     await user.tripleClick(screen.getByText(/добавить информацию/i)) 

// 	const titleContainer0 = screen.getByTestId('titleContainer0')
// 	const titleContainer1 = screen.getByTestId('titleContainer1')
// 	const titleContainer2 = screen.getByTestId('titleContainer2')

// 	const descriptionContainer0 = screen.getByTestId('descriptionContainer0')
// 	const descriptionContainer2 = screen.getByTestId('descriptionContainer2')

// 	const titles = screen.getAllByPlaceholderText('введите заголовок')
// 	const descriptions = screen.getAllByPlaceholderText('введите описание')



	// await waitFor(()=>user.type(titles[1], '*')) 
	// await waitFor(()=>user.type(titles[2], '* hi')) 

	// await waitFor(()=> user.type(descriptions[0], '@'))
	// await waitFor(()=> user.type(descriptions[2], ' huita'))
    
	// expect(await waitFor(()=>titleContainer1)).toHaveTextContent("title err")
	// expect(await waitFor(()=>titleContainer2)).toHaveTextContent("title err")

	// expect(await waitFor(()=>descriptionContainer0)).toHaveTextContent("description err")
	// expect(await waitFor(()=>descriptionContainer2)).toHaveTextContent("description err")
// })

