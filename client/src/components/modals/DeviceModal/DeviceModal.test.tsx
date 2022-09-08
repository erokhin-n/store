import {fireEvent, render, waitFor} from '../../../testUtils/test_utils_device'
import {screen} from '@testing-library/dom'
import '@testing-library/jest-dom'
import DeviceModal from '../DeviceModal/DeviceModal'
import AdminPage from '../../../pages/AdminPage/AdminPage'
import userEvent from '@testing-library/user-event'


test('test for deviceModal', async ()=> {
    const userAction = userEvent.setup()
    render(<DeviceModal />)

    const image = await require('../../../../public/logo192.png')

    const selectBrand = screen.findByText("выберите бренд")
    const selectType = screen.findByText("выберите тип")
    const nameInput = screen.getByPlaceholderText("введите название")
    const priceInput = screen.getByPlaceholderText("введите цену")
    const imageInput = screen.getByPlaceholderText("добавьте изображение")
 
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

    // fireEvent.change(nameInput,{target: {value: 'hi'}})
    // fireEvent.change(priceInput,{target: {value: " "}})

    fireEvent.click(button)
    fireEvent.change(imageInput, {target: {value: image}})


    // const errorMessageBrand = await waitFor(()=> screen.findByText("нужно выбрать бренд"))
    // const errorMessageType = await waitFor(()=> screen.findByText("нужно выбрать тип"))
    // const errorMessageNameInput = await waitFor(()=> screen.findByText("поле содержит недопустимые символы"))
    // const errorMessagePriceInput = await waitFor(()=> screen.findByText("цена содержит недопустимые символы"))
      
   
    
    fireEvent.click(button)

    const errorMessageImageInput = await waitFor(()=> screen.findByText("добавьте изображение")) 

    // expect(await waitFor(()=> errorMessageBrand)).toHaveTextContent("нужно выбрать бренд")
    // expect(await waitFor(()=> errorMessageType)).toHaveTextContent("нужно выбрать тип")
    // expect(await waitFor(()=> errorMessageNameInput)).toHaveTextContent("поле содержит недопустимые символы")
    // expect(await waitFor(()=> errorMessagePriceInput)).toHaveTextContent("цена содержит недопустимые символы")
    expect(await waitFor(()=> errorMessageImageInput)).toHaveTextContent("добавьте изображение")


    // .toBeInTheDocument()
})