import { FC } from "react"
import { IDevice, IDeviceProps } from "../interface/interface"
import BasketButton from "../images/svg/BasketButton"
import { useAddDeviceMutation, useGetBasketQuery } from "../store/apiSlice/basketSlice"
import { useCheckQuery } from "../store/apiSlice/userSlice"
import { useGetProductCardQuery } from "../store/apiSlice/deviceSlice"
import { useNavigate } from "react-router-dom"
import { PagesEnum } from "../enums/enums"


const DeviceItem:FC<IDeviceProps<IDevice>> = ({device, basketId}) => {

    const navigate = useNavigate()

    const [addDevice, {data}] = useAddDeviceMutation()

    const saveDeviceInBasket = () => {
        addDevice({device, basketId}) 
    }

    const goToProductCard = () => {
        navigate(PagesEnum.PRODUCT_CARD + '/' + device.id)
    }

    return (
        <div 
            className="productCard"
            onClick={()=> goToProductCard()}
        >
            <h3 className="deviceName">{device.name}</h3>
            <img className="productCardImage" width={150} height={150} src={'http://localhost:5000/' + device.img} />
            <span className="productCardRating">рейтинг: {device.rating}</span>
            <span className="productCardPrice">цена: {device.price}</span>
            <div 
                className="productCardButtonContainer"
                onClick={()=> saveDeviceInBasket()}
            >
                <BasketButton />
            </div>
        </div>
    )
}

export default DeviceItem