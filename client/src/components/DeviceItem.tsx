import { FC } from "react"
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
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig"

const storage = getStorage(app);
const storageRef = ref(storage);

const DeviceItem:FC<IDeviceProps<IDevice>> = ({device, basketId}) => {

    const navigate = useNavigate()

    const [addDevice, {data}] = useAddDeviceMutation()

    const saveDeviceInBasket = () => {
        addDevice({device, basketId}) 
    }

    const goToProductCard = () => {
        navigate(PagesEnum.PRODUCT_CARD + '/' + device.id) 
    }

    const storageWay = `${storageRef}${device.img}`

    console.log(storageRef)

    getDownloadURL(ref(storage, storageWay))
    .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
        const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element
        // const img = document.getElementById('myimg');
        // img.setAttribute('src', url);
    })
    .catch((error) => {
        // Handle any errors
    });

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
                    image={storageWay}  
                    alt="device"
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