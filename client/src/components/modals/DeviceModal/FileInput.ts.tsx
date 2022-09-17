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


    // user.click(screen.getByText("сохранить устройство"))

    await user.click(screen.getByText(/x/i))

	// user.click(screen.getByText("сохранить устройство"))

    await user.upload(fileInput, file)

	expect(fileInput).toHaveValue('')

    // expect(await waitFor(()=> screen.findByText("добавьте изображение")))
    // .toBeInTheDocument()
})

