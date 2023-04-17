import { FC } from "react"
import { IBasket, IBasketDevice, IBasketResponse, IDevice } from "../../interface/interface"
import { useGetBasketDeviceQuery } from "../../store/apiSlice/basketSlice"

const BasketDevice:FC<{device:IBasketResponse}> = ({device}) => {
    const {data, isError} = useGetBasketDeviceQuery(device)
    return(
        <div>
            <h4>{data?.brandId}</h4>    
        </div>
    )
}

export default BasketDevice