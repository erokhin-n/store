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

test('test for nameInput', async ()=> {
        
    const {user} = setup(<DeviceModal />)

    const inputName = screen.getByPlaceholderText("введите название")

    // user.type(inputName, ' $')
    await waitFor(() => user.type(inputName, "test"))
    await waitFor(() =>user.keyboard('{BackSpace>4/}'))
    // await waitFor(() => user.type(inputName, "testdevice"))
    // await waitFor(() => user.type(inputName, "testdevice "))

	user.click(screen.getByText("сохранить устройство"))

    await waitFor(() => user.type(inputName, "test"))
    await waitFor(() =>user.keyboard('{BackSpace>4/}t'))


	// await waitFor(()=>user.selectOptions(screen.getByTestId('TypeSelect'), screen.getByText("холодильники"))) 

    expect(inputName).toHaveValue('y')

    // expect(await waitFor(()=> screen.findByText("поле содержит недопустимые символы")))
    // .toBeInTheDocument()

    

    // expect(await waitFor(()=> screen.findByText("нужно выбрать тип")))
    // .toBeInTheDocument()
})