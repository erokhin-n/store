import { FC } from "react"
import { IDevice, IDeviceProps } from "../interface/interface"

const DeviceItem:FC<IDeviceProps<IDevice>> = ({device}) => {
    return (
        <div className="productCard">
            <h3 className="deviceName">{device.name}</h3>
            <img width={150} height={150} src={'http://localhost:5000/' + device.img} />
            <span>рейтинг: {device.rating}</span>
            <span>цена: {device.price}</span>
            <button>add in basket</button>
        </div>
    )
}

export default DeviceItem