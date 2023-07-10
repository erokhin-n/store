import { FC } from "react"
import { IDevice, IDeviceProps } from "../interface/interface"
import BasketButton from "../images/svg/BasketButton"
import { useAddDeviceMutation, useGetBasketQuery } from "../store/apiSlice/basketSlice"
import { useCheckQuery } from "../store/apiSlice/userSlice"
import { useGetProductCardQuery } from "../store/apiSlice/deviceSlice"
import { useNavigate } from "react-router-dom"
import { PagesEnum } from "../enums/enums"
import Card from "@mui/material/Card"
import { Button, CardActionArea, CardMedia, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const DeviceItem:FC<IDeviceProps<IDevice>> = ({device, basketId}) => {

    const navigate = useNavigate()

    const [addDevice, {data}] = useAddDeviceMutation()

    const saveDeviceInBasket = () => {
        addDevice({device, basketId}) 
    }

    const goToProductCard = () => {
        navigate(PagesEnum.PRODUCT_CARD + '/' + device.id) 
    }

    console.log(device.img)

    

    return (
        <Card>
            <CardActionArea 
                onClick={()=> goToProductCard()}
            >
                <CardMedia 
                    component="img"
                    height='300' 
                    image={`http://localhost:5000/${device.img}`} 
                    alt="device"
                />
                 <Typography gutterBottom variant="h5" component="div">
                    price: {device.price}
                </Typography>
           
            <Button 
                variant="contained"
                onClick={()=> saveDeviceInBasket()}
            >
                <ShoppingCartIcon/>
            </Button>
            </CardActionArea>
        </Card>
    )
}

export default DeviceItem