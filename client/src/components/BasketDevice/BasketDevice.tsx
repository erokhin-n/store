import { FC } from "react"
import { IBasket, IBasketDevice, IBasketResponse, IDevice } from "../../interface/interface"
import { useGetBasketDeviceQuery } from "../../store/apiSlice/basketSlice"

const BasketDevice:FC<IBasketDevice<IBasketResponse>> = ({device, count}) => {
    const {data, isError, isLoading} = useGetBasketDeviceQuery(device)
    console.log(count)
    if (isLoading) {
        return (
            <div>loading...</div>
        )
    }

    if (isError) {
        <div>ошибка загрузки файла</div>
    }

    return(
        <div>
            { data &&  
                <div>
                    {count! + 1}. {data?.name} - {data.price} $
                </div>
            }     
        </div>
    )
}

export default BasketDevice