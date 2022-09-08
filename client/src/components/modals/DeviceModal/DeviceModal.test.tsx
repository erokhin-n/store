import {fireEvent, render, waitFor} from '../../../testUtils/test_utils_device'
import {screen} from '@testing-library/dom'
import '@testing-library/jest-dom'
import DeviceModal from '../DeviceModal/DeviceModal'
import AdminPage from '../../../pages/AdminPage/AdminPage'
import userEvent from '@testing-library/user-event'
import BrandIdSelect from '../../UI/BrandIdSelect'

function setup(tsx:any) {
    return {
      user: userEvent.setup(),
      ...render(tsx),
    }
  }


test('test for deviceModal', async ()=> {

        
    const {user} = setup(<BrandIdSelect />)

    const selectBrand:any = screen.getByText("выберите бренд")

    const samsung = screen.getByText("Samsung")

    user.selectOptions(await selectBrand, samsung)

    // const button = screen.getByText("сохранить устройство")
    
    // fireEvent.click(button)

    // const errorMessageBrand = await waitFor(()=> screen.findByText("нужно выбрать бренд")) 

    // expect(await waitFor(()=> errorMessageBrand)).toHaveTextContent("добавьте изображение")
    expect(selectBrand).toHaveValue("Samsung")

})