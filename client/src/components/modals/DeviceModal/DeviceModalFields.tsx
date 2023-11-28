import { useContext, MouseEvent, FC } from "react"
import { ValidationResult } from "../../../enums/enums"
import { IDeviceFormFields } from "../../../interface/interface"
import { initialState } from "../../../store/reactReducer/deviceModalReducer"
import { deviceFormValidation, priceFormValidation } from "../../../validation/DeviceFormValidation"
import BrandIdSelect from "../../UI/BrandIdSelect"
import ImageInput from "../../UI/ImageInput"
import NameInput from "../../UI/NameInput"
import PriceInput from "../../UI/PriceInput"
import TypeIdSelect from "../../UI/TypeIdSelect"
import DeviceInfo from "./DeviceInfo"
import { DeviceModalDispatch, DeviceModalState } from "./DeviceModal"
import {
    Button,
    Container,
    Paper,
    Typography,
    Grid,
    CssBaseline,
  } from '@mui/material';

const DeviceModalFields:FC<IDeviceFormFields> = ({sendDeviceForm}) => {

    const state = useContext(DeviceModalState)
    const dispatch = useContext(DeviceModalDispatch)

    const checkFieldsBeforeSend = () => { 
        dispatch!({type:'changeTypeIdValid', payload:deviceFormValidation(state!.typeId.value)});

        dispatch!({type:'changeBrandIdValid', payload:deviceFormValidation(state!.brandId.value)});

        dispatch!({type:"changeNameValid", payload: deviceFormValidation(state!.name.value)});

        dispatch!({type:'changePriceValid', payload:priceFormValidation(state!.price.value)});

        (state!.image.valid === ValidationResult.FIRST_ADDITION) && 
            dispatch!({type:'selectImage', payload:{value: '', valid: ValidationResult.ERROR}});

        state!.info.map(i => (i.titleValid === ValidationResult.FIRST_ADDITION) && 
            dispatch!({type:'changeTitle', payload: {value: '', id:i.id, valid:ValidationResult.ERROR}}))

        state!.info.map(i => (i.descriptionValid === ValidationResult.FIRST_ADDITION) && 
            dispatch!({type:'changeDescription', payload: {value: '', id:i.id, valid:ValidationResult.ERROR}}))
        
    }
  
    const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        checkFieldsBeforeSend()

        const modalValid = [state!.typeId.valid, state!.brandId.valid,
            state!.name.valid, state!.price.valid,state!.image.valid ].findIndex(
                element => element !== ValidationResult.SUCCESS)

        const infoTitleValid = state!.info.findIndex(i => i.titleValid !== ValidationResult.SUCCESS)
        const infoDescriptionValid = state!.info.findIndex(i => i.descriptionValid !== ValidationResult.SUCCESS)
        
        if((modalValid === -1 &&  infoTitleValid === -1 && infoDescriptionValid === -1 )) {
            sendDeviceForm() 
            dispatch!({type:'reset', payload: initialState}) 
        }
        
    }
    return (
      
      <Container component="main" maxWidth="xs">
        <Paper elevation={3}>
          <Typography component="h1" variant="h6">
            Добавление устройства
          </Typography>
          <Grid container spacing={2}>
            <TypeIdSelect />
            <BrandIdSelect />
            <NameInput />
            <PriceInput />
            {/* <ImageInput/> */}
            <DeviceInfo />
            
            </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: '20px' }}
            onClick={(e) => handleClick(e)}
          >
            Сохранить устройство
          </Button>
        </Paper>
      </Container>
    )
}

export default DeviceModalFields