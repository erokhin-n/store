import { FC, useEffect, useState } from "react";
import { IDevice, IDeviceProps } from "../interface/interface";
import { useAddDeviceMutation } from "../store/apiSlice/basketSlice";
import { useNavigate } from "react-router-dom";
import { PagesEnum } from "../enums/enums";
import Card from "@mui/material/Card";
import { Button, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ref, getDownloadURL } from 'firebase/storage';
import storage from '../firebaseConfig'; // Импортируйте storage из вашего файла

const DeviceItem: FC<IDeviceProps<IDevice>> = ({ device, basketId }) => {
    const navigate = useNavigate();
    const [addDevice] = useAddDeviceMutation();
    const [imageUrl, setImageUrl] =useState<string | null>(null);

    useEffect(() => {
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

    const goToProductCard = () => {
        navigate(PagesEnum.PRODUCT_CARD + '/' + device.id);
    }

    const saveDeviceInBasket = () => {
        addDevice({ device, basketId });
    }

    return (
        <Card
            sx={{
                maxWidth: 300,
                background: '#A0A0A0'
            }}
        >
            <CardActionArea
                onClick={goToProductCard}
            >
                <CardMedia
                    component="img"
                    height='250'
                    image={imageUrl || ''}
                    alt="device"
                />
                <CardContent>
                    <Typography
                        gutterBottom variant="h5"
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
                    onClick={saveDeviceInBasket}
                >
                    <ShoppingCartIcon />
                </Button>
            </CardActions>
        </Card>
    )
}

export default DeviceItem;
