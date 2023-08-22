import { FC, useState } from "react"
import { IDevice, IDeviceProps } from "../interface/interface"
import BasketButton from "../images/svg/BasketButton"
import { useAddDeviceMutation, useGetBasketQuery } from "../store/apiSlice/basketSlice"
import { useCheckQuery } from "../store/apiSlice/userSlice"
import { useGetProductCardQuery } from "../store/apiSlice/deviceSlice"
import { useNavigate } from "react-router-dom"
import { PagesEnum } from "../enums/enums"
import Card from "@mui/material/Card"
import { Button, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const DeviceItem:FC<IDeviceProps<IDevice>> = ({device, basketId}) => {

    // const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);

    // const handleImageLoad = () => {
    //     const reader = new FileReader();
    //     reader.onload = function(event) {
    //       setImageUrl(event.target!.result);
    //     };
    //     reader.readAsDataURL(device.img);
    //   };

    const navigate = useNavigate()

    const [addDevice, {data}] = useAddDeviceMutation()

    const saveDeviceInBasket = () => {
        addDevice({device, basketId}) 
    }

    const goToProductCard = () => {
        navigate(PagesEnum.PRODUCT_CARD + '/' + device.id) 
    }

    // const imageUrl = `https://storage.googleapis.com/storepictures-db9c6.appspot.com/images/${encodeURIComponent(device.img)}`;
    
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/storepictures-db9c6.appspot.com/o/images/${device.img}?alt=media`;
        
    return (
        <Card 
            sx={{ 
                maxWidth: 300,
                background: '#A0A0A0'
            }}
            
        >
            <CardActionArea 
                onClick={()=> goToProductCard()}
            >
                <CardMedia 
                    component="img"
                    height='250' 
                    image={imageUrl} 
                    alt="device"
                    // onLoad={handleImageLoad}
                />
                <CardContent>
                    <Typography 
                        gutterBottom variant="h5" 
                        // component="div"
                        color='#fff'
                    >
                        {device.name}
                    </Typography>
                    <Typography variant="body2" color="#fff">
                        price: {device.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button 
                    variant="contained"
                    onClick={()=> saveDeviceInBasket()}
                >
                    <ShoppingCartIcon/>
                </Button>
            </CardActions>
        </Card>
    )
}

export default DeviceItem