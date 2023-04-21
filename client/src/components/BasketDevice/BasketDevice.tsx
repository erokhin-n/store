import { FC } from "react"
import { IBasket, IBasketDevice, IBasketResponse, IDevice } from "../../interface/interface"
import { useGetBasketDeviceQuery } from "../../store/apiSlice/basketSlice"

const BasketDevice:FC<IBasketDevice<IBasketResponse>> = ({device}) => {
    const {data, isError} = useGetBasketDeviceQuery(device)
    return(
        <div>
            { data &&  <div>{data?.name}</div>}  
        </div>
    )
}

export default BasketDevice