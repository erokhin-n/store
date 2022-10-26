import { FC } from "react"
import { IDevice, IDevicesProps } from "../interface/interface"
import DeviceItem from "./DeviceItem"

const DeviceList:FC<IDevicesProps<IDevice[]>> = ({devices}) => {
    return (
        <div className="deviceList">
            {devices.map((device:IDevice) => 
                <DeviceItem 
                    key={device.id}
                    device={device} 
            />)}
        </div>
    )
}

export default DeviceList