import { FC, useState } from "react"
import { IDevice, IDeviceProps } from "../interface/interface"
import BasketButton from "../images/svg/BasketButton"
import { useAddDeviceMutation, useGetBasketQuery } from "../store/apiSlice/basketSlice"
import { useCheckQuery } from "../store/apiSlice/userSlice"
import { useDeletePictureMutation, useGetProductCardQuery } from "../store/apiSlice/deviceSlice"
import { useNavigate } from "react-router-dom"
import { PagesEnum } from "../enums/enums"
import Card from "@mui/material/Card"
import { Button, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const storage = getStorage(app);
const storageRef = ref(storage);

const DeviceItem:FC<IDeviceProps<IDevice>> = ({device, basketId}) => {

    const navigate = useNavigate()

    const [addDevice, {data}] = useAddDeviceMutation()
    const [deletePicture, {data: imgInfo}] = useDeletePictureMutation()

    const [picture, setPicture] = useState<string | null>(null)

    const saveDeviceInBasket = () => {
        addDevice({device, basketId}) 
    }

    const goToProductCard = () => {
        navigate(PagesEnum.PRODUCT_CARD + '/' + device.id) 
    }

    const deletePictureFunc = (id:number) => {
        console.log('delete picture function: ' + id)
        deletePicture(id) 
    }

    const storageWay = `${storageRef}${device.img}`

    getDownloadURL(ref(storage, storageWay))
    .then((url) => {
        
        const xhr = new XMLHttpRequest();
        console.log('url in getDownloadUrl ' + url)
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
        const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        setPicture(url)
    })
    .catch((error) => {
        console.log('error in getDownloadUrl')
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
                    image={(picture) ? picture : 'no image'}  
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
                <Button 
                    variant="contained"
                    color="error"
                    onClick={()=> deletePictureFunc(device.id)}
                > 
                    <DeleteOutlineIcon/>
                </Button>
            </CardActions>
        </Card>
    )
}

export default DeviceItem