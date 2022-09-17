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

test('test for DeviceInfo', async ()=> {
        
    const {user} = setup(<DeviceModal />)

    await user.click(screen.getByText(/добавить информацию/i)) 

    await waitFor(()=> user.type(screen.getByText(/введите название/i), '^'))
    
    
})

