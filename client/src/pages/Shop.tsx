// import BrandModal from "../components/modals/BrandModal/BrandModal"
import DeviceList from "../components/DeviceList"
import Footer from "../components/Footer"
import { useAppSelector } from "../hooks/useDispatchAndSelector"
import { useGetAllDevicesQuery} from "../store/apiSlice/deviceSlice"
import { useGetAllTypesQuery } from "../store/apiSlice/typeSlice"


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
        if(devices.rows) {
            deviceList = (devices.rows.length) ? 
            <DeviceList devices={devices.rows} /> : 
            <h3>устройств нет</h3>
        } else {
            deviceList = <h3>no devices in mocks</h3>
        }
    } else if(isError) {
        deviceList = <div>error</div>
    }

    return (
        <div className="shop">
            {deviceList}
        </div>
    )
}

export default Shop