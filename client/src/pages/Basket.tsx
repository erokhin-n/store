import { useGetBasketDevicesQuery, useGetBasketQuery } from "../store/apiSlice/basketSlice"

const Basket = () => {
    
    const {data, isLoading, isError} = useGetBasketQuery()

    let basketId = undefined;

    if(data) {
        basketId = data.id
    }

    // const { data: devices } = useGetBasketDevicesQuery(data)

    if(isError) {
        return <h3>error in basket!</h3>
    }

    return(
        <div>
            <h3>basket</h3>
            {data && <span>{data.id}</span>}
        </div>
    )
}

export default Basket