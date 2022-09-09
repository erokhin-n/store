import {fireEvent, render, waitFor} from '../../../testUtils/test_utils_device'
import {screen} from '@testing-library/dom'
import '@testing-library/jest-dom'
import DeviceModal from '../DeviceModal/DeviceModal'
import AdminPage from '../../../pages/AdminPage/AdminPage'
import userEvent from '@testing-library/user-event'
import BrandIdSelect from '../../UI/BrandIdSelect'
import NameInput from '../../UI/NameInput'

function setup(tsx:any) {
    return {
      user: userEvent.setup(),
      ...render(tsx),
    }
  }


test('test for deviceModal', async ()=> {
        
    const {user} = setup(<DeviceModal />)

	const select = screen.getByTestId('select')

    const selectBrand = screen.getByText("выберите бренд")
	// const nameInput = await waitFor(()=> screen.findByPlaceholderText("введите название"))

	// user.click(selectBrand)
    const samsung = await waitFor(()=> screen.findByText("Samsung"),{timeout: 1500})

	// user.click(samsung)
    user.selectOptions(select, samsung)
    user.selectOptions(select, selectBrand)

    // const button = screen.getByText("сохранить устройство")
    
    // fireEvent.click(button)

    const errorMessageBrand = await waitFor(()=> screen.findByText("нужно выбрать бренд"),{timeout: 3500}) 

    // expect(await waitFor(()=> errorMessageBrand)).toHaveTextContent("добавьте изображение")
    expect(select).toHaveTextContent("Samsung")

})