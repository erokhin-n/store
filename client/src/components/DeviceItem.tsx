import { FC } from "react"
import { IDevice, IDeviceProps } from "../interface/interface"

const DeviceItem:FC<IDeviceProps<IDevice>> = ({device}) => {
    return (
        <div>
            <h3>{device.name}</h3>
            <div>{device.img}</div>
            <span>рейтинг: {device.rating}</span>
            <span>цена: {device.price}</span>
        </div>
    )
}

export default DeviceItem