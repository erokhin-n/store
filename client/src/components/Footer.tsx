import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import { Paper } from '@mui/material';

const Footer = () => {
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, marginTop: "1rem"}} elevation={3}>
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