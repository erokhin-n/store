import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Delete from "@mui/icons-material/Delete"
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import { Paper, TextField } from '@mui/material';

const Footer = () => {
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation 
                showLabels
                sx={{background:"#D3D3D3"}} 
            >
                <BottomNavigationAction label="i am podval" icon={<RestoreIcon />}/>
            </BottomNavigation>
        </Paper>
    )
}

export default Footer