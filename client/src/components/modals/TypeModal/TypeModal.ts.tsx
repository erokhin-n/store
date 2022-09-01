import {fireEvent, render, waitFor} from '../../../testUtils/test_utils_device'
import {screen} from '@testing-library/dom'
import '@testing-library/jest-dom'
import DeviceModal from '../DeviceModal/DeviceModal'
import AdminPage from '../../../pages/AdminPage/AdminPage'
import TypeModal from './TypeModal'


test('test for typeModal', async ()=> {
    render(<TypeModal />)

    const nameInput = await waitFor(()=> screen.findByPlaceholderText("название типа устройства"))
    const button = await waitFor(()=> screen.findByRole('button'))

    const typeName = "TLtype&2"

    fireEvent.change(nameInput, {target: {value: typeName}})
    // fireEvent.click(button)

    // expect(await waitFor(()=> screen.findByText(`Необходимо исправить поле перед отправкой`)))
    expect(await waitFor(()=> screen.findByText(`поле содержит недопустимые символы`)))
    // expect(await waitFor(()=> screen.findByText(`type ${typeName} saved`)))
    // expect(await waitFor(()=> screen.findByText("такой тип уже существует"),{timeout: 3000}))

    .toBeInTheDocument()
})