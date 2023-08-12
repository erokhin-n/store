import { FC } from "react"
import { useParams } from "react-router-dom"
import { useGetProductCardQuery } from "../store/apiSlice/deviceSlice"
import { info } from "console"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
// import BrandModal from "../components/modals/BrandModal/BrandModal"


const ProductCard:FC = () => {

    const {id = ''} = useParams()

    const {data, isError} = useGetProductCardQuery(id)
    
    return (
        <Container maxWidth="md">
            <Typography component='h2'>{data?.name}</Typography>
            <Box mt={2} sx={{ width: '10rem', height: '10rem' }}>
                <img src={`https://backend-qz2r.onrender.com/${data?.img}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />     
            </Box>
                       
            
            {data?.info && data?.info.map(i => 
                <div key={i.title}>{i.title} : {i.description}</div>
            )}
        </Container>
    )
}

export default ProductCard