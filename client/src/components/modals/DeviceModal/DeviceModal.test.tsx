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


test('test for BrandModal', async ()=> {
        
    const {user} = setup(<DeviceModal />)

    user.selectOptions(screen.getByTestId('BrandSelect'), await screen.findByText("Samsung"))
    user.selectOptions(screen.getByTestId('BrandSelect'), screen.getByText("выберите бренд"))
    user.click(screen.getByText("сохранить устройство"))

    expect(await waitFor(()=> screen.findByText("нужно выбрать бренд")))
    .toHaveTextContent("нужно выбрать бренд")

})

test('test for TypeModal', async ()=> {
        
    const {user} = setup(<DeviceModal />)

    user.selectOptions(screen.getByTestId('TypeSelect'), await screen.findByText("холодильники"))
    user.selectOptions(screen.getByTestId('TypeSelect'), screen.getByText("выберите тип"))
    user.selectOptions(screen.getByTestId('TypeSelect'), await screen.findByText("холодильники"))
    user.click(screen.getByText("сохранить устройство"))

    expect(await waitFor(()=> screen.findByText("нужно выбрать тип")))
    .toHaveTextContent("нужно выбрать тип")

})
