import { FC } from "react"
import { IBasket, IBasketDevice, IBasketResponse, IDevice } from "../../interface/interface"
import { useGetBasketDeviceQuery } from "../../store/apiSlice/basketSlice"
import { useNavigate } from "react-router-dom"
import { PagesEnum } from "../../enums/enums"

const BasketDevice:FC<IBasketDevice<IBasketResponse>> = ({device, count}) => {

    const {data, isError, isLoading} = useGetBasketDeviceQuery(device)

    const navigate = useNavigate()

    const goToProductCard = () => {
        navigate(PagesEnum.PRODUCT_CARD + '/' + device.deviceId)
    }

    if (isLoading) {
        return (
            <div>loading...</div>
        )
    }

    if (isError) {
        <div>ошибка загрузки устройства</div>
    }

    return(
        <div>
            { data &&  
                <div>
                    <div onClick={() => goToProductCard()}>
                        {count! + 1}. {data?.name} - {data.price} $
                    </div>
                    <input type="number" min={1} defaultValue="1"/>
                    <button className="waves-effect waves-light btn">delete</button>
                </div>
            }     
        </div>
    )
}

export default BasketDevice