import { FC } from "react"
import { IDevice, IDevicesProps } from "../interface/interface"
import { useGetBasketNumberQuery, useGetBasketQuery } from "../store/apiSlice/basketSlice"
import DeviceItem from "./DeviceItem"
import Grid from "@mui/material/Grid"
import { Container } from "@mui/material"

const DeviceList:FC<IDevicesProps<IDevice[]>> = ({devices}) => {
    const {data} = useGetBasketNumberQuery()
    const basketId = data?.id
    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                // flexDirection: "column", 
                justifyContent: "center",
                // alignItems: "center"
                
            }}
        >
            <Grid 
                container 
                spacing={2} 
                alignItems='center'
                justifyContent="center"  
                pt={3}
                // columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
            >
                
                {devices.map((device:IDevice) => 
                    <Grid 
                        item
                        key={device.id}
                        xs={12} 
                        sm={6} 
                        md={4}
                    >
                        <DeviceItem
                            basketId={basketId}
                            key={device.id}
                            device={device} 
                        />
                    </Grid>
                    )}
            </Grid>
        </Container>
    )
}

export default DeviceList