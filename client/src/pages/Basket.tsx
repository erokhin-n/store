import { useEffect } from "react"
import BasketDevice from "../components/BasketDevice/BasketDevice"
import { IBasket, IBasketDevice, IBasketResponse } from "../interface/interface"
import { useGetBasketDeviceQuery, useGetBasketQuery } from "../store/apiSlice/basketSlice"

const Basket = () => {
    
    const {data, isLoading, isError} = useGetBasketQuery()
    
    
    if(isError) {
        return <h3>error in basket!</h3>
    }

    if(isLoading) {
        return <h3>loading...</h3>
    }

    return(
        <div>
            <h3>basket</h3>
            {data ? data.map((basketDevice:IBasketResponse, index) =>
                <BasketDevice 
                    key={basketDevice.id} 
                    device={basketDevice} 
                    index={index + 1}
                />
                ) 
                : <h4>нет устройств</h4>
            }
        </div>
    )
}

export default Basket