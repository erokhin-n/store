import { FC, useEffect, useState } from "react"
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
    const [idState, setIdState] = useState<any>()

    useEffect(() => {
        if (device) {
            const storageWay = `${storageRef}${device.img}`;
            getDownloadURL(ref(storage, storageWay))
                .then((url) => {
                    const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            setPicture(url)
                })
                .catch((error) => {
                    console.log('error in getDownloadUrl', error);
                });
        }
    }, [device]);

    const saveDeviceInBasket = () => {
        addDevice({device, basketId}) 
    }

    const goToProductCard = () => {
        navigate(PagesEnum.PRODUCT_CARD + '/' + device.id) 
    }

    const deletePictureFunc = () => {
        if(device) {
            deletePicture({id:device.id}) 
        } else {
            console.log('no device')
        }
    }

    const {data:check, isLoading} = useCheckQuery()

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
                {(check?.role! === "ADMIN") ? 
                <Button 
                    variant="contained"
                    color="error"
                    onClick={()=> deletePictureFunc()}
                > 
                    <DeleteOutlineIcon/>
                </Button>
                : null
                }
            </CardActions>
        </Card>
    )
}

export default DeviceItem