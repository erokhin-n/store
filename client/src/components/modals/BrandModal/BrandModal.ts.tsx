import {fireEvent, render, waitFor} from '../../../testUtils/test_utils_device'
import {screen} from '@testing-library/dom'
import '@testing-library/jest-dom'
import DeviceModal from '../DeviceModal/DeviceModal'
import AdminPage from '../../../pages/AdminPage/AdminPage'
import TypeModal from '../TypeModal/TypeModal'
import BrandModal from './BrandModal'

test('test for brandModal', async ()=> {
    render(<BrandModal />)

    const nameInput = await waitFor(()=> screen.findByPlaceholderText("название бренда"))
    const button = await waitFor(()=> screen.findByRole('button'))

    const brandName = "hi hi"

    fireEvent.change(nameInput, {target: {value: brandName}})
    // fireEvent.click(button)

    // expect(await waitFor(()=> screen.findByText(`Необходимо исправить поле перед отправкой`)))
    expect(await waitFor(()=> screen.findByText(`поле содержит недопустимые символы`)))
    // expect(await waitFor(()=> screen.findByText(`brand ${brandName} saved`),{timeout: 3000}))
    // expect(await waitFor(()=> screen.findByText("такой бренд уже существует"),{timeout: 3000}))

    // .toHaveTextContent(`brand ${brandName} saved`)
    .toBeInTheDocument()
})