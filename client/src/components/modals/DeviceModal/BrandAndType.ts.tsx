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


test('test for BrandSelect', async ()=> {
        
    const {user} = setup(<DeviceModal />)

    user.selectOptions(screen.getByTestId('BrandSelect'), await screen.findByText("Samsung"))
    user.selectOptions(screen.getByTestId('BrandSelect'), screen.getByText("выберите бренд"))

    user.click(screen.getByText("сохранить устройство"))

	await waitFor(()=>user.selectOptions(screen.getByTestId('BrandSelect'), screen.getByText("Samsung"))) 
    user.selectOptions(screen.getByTestId('BrandSelect'), screen.getByText("выберите бренд"))

    user.click(screen.getByText("сохранить устройство"))

    // await waitFor(()=>user.selectOptions(screen.getByTestId('BrandSelect'), screen.getByText("Samsung"))) 

    expect(await waitFor(()=> screen.findByText("нужно выбрать бренд")))
    .toHaveTextContent("нужно выбрать бренд")

})

test('test for TypeSelect', async ()=> {
        
    const {user} = setup(<DeviceModal />)

    user.selectOptions(screen.getByTestId('TypeSelect'), screen.getByText("холодильники"))
    user.selectOptions(screen.getByTestId('TypeSelect'), screen.getByText("выберите тип"))
    user.selectOptions(screen.getByTestId('TypeSelect'), screen.getByText("холодильники"))
	user.selectOptions(screen.getByTestId('TypeSelect'), screen.getByText("выберите тип"))

	user.click(screen.getByText("сохранить устройство"))

	await waitFor(()=>user.selectOptions(screen.getByTestId('TypeSelect'), screen.getByText("холодильники"))) 
	await waitFor(()=>user.selectOptions(screen.getByTestId('TypeSelect'), screen.getByText("выберите тип"))) 

	user.click(screen.getByText("сохранить устройство"))

	// await waitFor(()=>user.selectOptions(screen.getByTestId('TypeSelect'), screen.getByText("холодильники"))) 

    expect(await waitFor(()=> screen.findByText("нужно выбрать тип")))
    .toHaveTextContent("нужно выбрать тип")

    // expect(await waitFor(()=> screen.findByText("нужно выбрать тип")))
    // .toBeInTheDocument()
})


