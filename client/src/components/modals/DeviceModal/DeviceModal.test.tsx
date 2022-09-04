import {fireEvent, render, waitFor} from '../../../testUtils/test_utils_device'
import {screen} from '@testing-library/dom'
import '@testing-library/jest-dom'
import DeviceModal from '../DeviceModal/DeviceModal'
import AdminPage from '../../../pages/AdminPage/AdminPage'
import userEvent from '@testing-library/user-event'


test('test for typeModal', async ()=> {
    const userAction = userEvent.setup()
    render(<DeviceModal />)

    const brandIdSelect = await waitFor(()=> screen.findByText("выберите бренд"))
    // const  = await waitFor(()=> screen.findByPlaceholderText("введите название"))
    // const button = await waitFor(()=> screen.findByRole('button'))

    const typeName = "TLtype&2"

    // userAction.type(nameInput, typeName )
    // fireEvent.change(nameInput, {target: {value: typeName}})
    // fireEvent.click(button)

    userAction.selectOptions(screen.getByTestId("select"), screen.getByText())

    // expect(await waitFor(()=> screen.findByText(`Необходимо исправить поле перед отправкой`)))
    // expect(await waitFor(()=> screen.findByText(`поле содержит недопустимые символы`)))
    // expect(await waitFor(()=> screen.findByText(`type ${typeName} saved`)))
    // expect(await waitFor(()=> screen.findByText("такой тип уже существует"),{timeout: 3000}))

    expect(await waitFor(()=> brandIdSelect)).toHaveValue("Samsung")
    // .toBeInTheDocument()
})