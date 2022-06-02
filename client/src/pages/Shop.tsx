
import { useSelector } from "react-redux"
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

    const role = useSelector((state:any) => state.user.role)
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