
import BrandModal from "../components/BrandModal"
import DeviceList from "../components/DeviceList"
import { useGetAllDevicesQuery} from "../store/apiSlice"


const Shop = () => {

    const {
        data: devices,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllDevicesQuery()

    const testLogin = {
        email: 'admin2',
        password: 'admin2'
    }


    // const testLogin = {
    //     email: 'user227',
    //     password: 'user227', 
    // }

    // const {data: token} = useGetLoginQuery(testLogin)

    // console.log(token)

    let deviceList

    if(isLoading) {
        deviceList = "load..."
    } else if(isSuccess){
        deviceList = (devices.rows.length) ? 
            <DeviceList devices={devices.rows} /> : 
            <h3>устройств нет</h3>
    } else if(isError) {
        deviceList = <div>error</div>
    }

    const role = localStorage.getItem("role")
    console.log(role)

    return (
        <div>
            {role === "ADMIN" ? 'HI ADMIN!' : "HI USER!"}
            <BrandModal />
            {deviceList}
        </div>
    )
}

export default Shop