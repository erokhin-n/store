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

test('test for fileInput', async ()=> {
        
    const {user} = setup(<DeviceModal />)

    const file = new File(['shop_image'], 'shop_image.jpg', {type: 'image/jpg'})

    const fileInput = screen.getByLabelText(/изображение/i)

    await user.upload(fileInput, file)

    // user.clear(fileInput)

    // expect(fileInput.files[0]).toBe(file)
    user.click(screen.getByText("сохранить устройство"))

    expect(await waitFor(()=> screen.findByText("добавьте изображение")))
    .toBeInTheDocument()
})

