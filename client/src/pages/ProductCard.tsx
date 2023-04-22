import { FC } from "react"
import { useParams } from "react-router-dom"
import { useGetProductCardQuery } from "../store/apiSlice/deviceSlice"
import { info } from "console"
// import BrandModal from "../components/modals/BrandModal/BrandModal"


const ProductCard:FC = () => {

    const {id = ''} = useParams()

    const {data, isError} = useGetProductCardQuery(id)
   
    return (
        <section>
            <div>{data?.name}</div>
            {data?.info && data?.info.map(i => 
                <div key={i.title}>{i.title} : {i.description}</div>
            )}
        </section>
    )
}

export default ProductCard