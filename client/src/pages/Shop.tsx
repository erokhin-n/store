
import DeviceList from "../components/DeviceList"
import { useGetAllDevicesQuery, useGetLoginQuery} from "../store/apiSlice"


const Shop = () => {

    const {
        data: devices,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllDevicesQuery()


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

    return (
        <div>
            {deviceList}
        </div>
    )
}

export default Shop