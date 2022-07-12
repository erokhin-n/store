import { useGetBasketQuery } from "../store/apiSlice/basketSlice"

const Basket = () => {
    
    const {data, isLoading, isError} = useGetBasketQuery()

    if(isError) {
        return <h3>error, mutherCockSucker!</h3>
    }
    return(
        <div>
            <h3>basket</h3>
        {data && <span>{data.id}</span>}
        </div>
    )
}

export default Basket