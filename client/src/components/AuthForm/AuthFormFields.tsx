import { FC, useContext } from "react"
import { formView, ValidationResult } from "../../enums/enums"
import { LoginActions, LoginState } from "../../App"
import { IAuthFormFields } from "../../interface/interface"
import ErrorModal from "../ErrorModal"
import Button from '@mui/material/Button';
import Box from "@mui/material/Box"
import { Grid, TextField, Typography } from "@mui/material"


const AuthFormFields:FC<IAuthFormFields>= ({changeEmail, changePassword, handleClick}) => {

    const state = useContext(LoginState)
    const dispatch = useContext(LoginActions)

    return (
        <Box 
            component={"form"}
            sx={{
                display:{
                    xs:"flex", 
                    flexDirection:'column', 
                    alignItems: 'center', 
                    border: '1px solid #D3D3D3',
                    borderRadius: '5px',
                    padding:"5%",
                    background: "#F2F2F2"
                } 
            }}
        >
            <TextField
                label="email"
                placeholder="введите почту" 
                value={state?.email.value}
                onChange={e => changeEmail(e.target.value)}
                variant="filled"
                error={state!.email.validInfo === ValidationResult.ERROR}
                helperText={(state!.email.validInfo === ValidationResult.ERROR) ? 
                    'введите почту в формате email@mail.com' :
                    ' '
                }
            />
            <TextField
                label="password" 
                placeholder="введите пароль"
                value={state!.password.value}
                onChange={e => changePassword(e.target.value)}
                variant="filled"
                error={state!.password.validInfo === ValidationResult.ERROR}
                helperText={(state!.password.validInfo === ValidationResult.ERROR) ? 
                    "пароль должен состоять из 8ми букв" :
                    ' '
                }
            />

            {state!.serverMessage && <ErrorModal error={state!.serverMessage} />}
            <Box mb={{xs:1}}>
                <Button 
                    variant="contained"
                    onClick={ e =>  handleClick(e)}
                >
                    {state!.formView === formView.FORM_SUPER_ADMIN ? 
                        'регистрация админа' : 
                        state!.formView === formView.FORM_LOGIN ?
                        "войти" : "регистрация"
                    }
                </Button>
            </Box>
            {state!.formView === formView.FORM_SUPER_ADMIN ?
                null :
                (state!.formView === formView.FORM_LOGIN) ?
                <Grid             
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography
                            variant={"subtitle1"}
                        >
                            Нет аккаунта?
                        </Typography>
                    </Grid> 
                    <Grid item>
                        <Typography
                            component={"i"} 
                            variant={"overline"}
                            onClick={()=> dispatch!({type:'setFormView', payload: formView.FORM_REGISTRATION})}
                            color={"#1976d2"}
                            sx={{cursor:'pointer'}}
                            
                        >
                            зарегистрируйтесь
                        </Typography>
                    </Grid>
                </Grid>
                :
                <Grid 
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant={"subtitle1"}>есть аккаунт?</Typography> 
                    </Grid>
                    <Grid>
                        <Typography
                            component={"i"}
                            onClick={()=> dispatch!({type:'setFormView', payload: formView.FORM_LOGIN})}
                            variant={"overline"}
                            color={"#1976d2"}
                            sx={{cursor:'pointer'}}
                        >   
                            войдите
                        </Typography>
                    </Grid>
                </Grid>    
            }
        </Box>
    )
} 

export default AuthFormFields