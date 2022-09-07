import {fireEvent, render, waitFor} from '../../../testUtils/test_utils_device'
import {screen} from '@testing-library/dom'
import '@testing-library/jest-dom'
import DeviceModal from '../DeviceModal/DeviceModal'
import AdminPage from '../../../pages/AdminPage/AdminPage'
import userEvent from '@testing-library/user-event'


test('test for typeModal', async ()=> {
    // const userAction = userEvent.setup()
    render(<DeviceModal />)


    const selectBrand = screen.findByText("выберите бренд")
    const selectType = screen.findByText("выберите тип")
    const nameInput = screen.getByPlaceholderText("введите название")

    const samsung = await waitFor(()=> screen.findByText("Samsung"))
    const icemachine = await waitFor(()=> screen.findByText("холодильники"))

    const button = screen.getByText("сохранить устройство")


    // fireEvent.click(selectBrand)
    // fireEvent.click(samsung)
    // fireEvent.click(selectBrand)

    // fireEvent.click(samsung)

    // fireEvent.click(selectBrand)

    // fireEvent.click(icemachine)
    // fireEvent.click(selectType)

    fireEvent.change(nameInput,{target: {value: ' hi'}})

    // const errorMessageBrand = await waitFor(()=> screen.findByText("нужно выбрать бренд"))
    // const errorMessageType = await waitFor(()=> screen.findByText("нужно выбрать тип"))
    const errorMessageNameInput = await waitFor(()=> screen.findByText("поле содержит недопустимые символы"))   
    
    fireEvent.click(button)

    // expect(await waitFor(()=> errorMessageBrand)).toHaveTextContent("нужно выбрать бренд")
    // expect(await waitFor(()=> errorMessageType)).toHaveTextContent("нужно выбрать тип")
    expect(await waitFor(()=> errorMessageNameInput)).toHaveTextContent("поле содержит недопустимые символы")
    // .toBeInTheDocument()
})