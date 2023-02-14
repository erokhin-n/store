import { FC } from "react"
import { IDevice, IDevicesProps } from "../interface/interface"
import { useGetBasketQuery } from "../store/apiSlice/basketSlice"
import DeviceItem from "./DeviceItem"

const DeviceList:FC<IDevicesProps<IDevice[]>> = ({devices}) => {
    const {data} = useGetBasketQuery()
    const basketId = data?.id
    return (
        <div className="deviceList">
            {devices.map((device:IDevice) => 
                <DeviceItem
                    basketId={basketId}
                    key={device.id}
                    device={device} 
            />)}
        </div>
    )
}

export default DeviceList