import { FC, useEffect, useState } from "react"
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
import { getStorage, ref, getDownloadURL } from 'firebase/storage';


const DeviceItem:FC<IDeviceProps<IDevice>> = ({device, basketId}) => {

    const navigate = useNavigate()

    const [addDevice, {data}] = useAddDeviceMutation()

    const saveDeviceInBasket = () => {
        addDevice({device, basketId}) 
    }

    const goToProductCard = () => {
        navigate(PagesEnum.PRODUCT_CARD + '/' + device.id) 
    }

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const storage = getStorage(); // Используйте глобальный объект firebase
    
        async function loadImageUrl() {
          try {
            const storageRef = ref(storage, 'images/' + device.img.name);
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);
          } catch (error) {
            console.error('Error loading image URL:', error);
          }
        }
    
        loadImageUrl();
      }, [device.img]);

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