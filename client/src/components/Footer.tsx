import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Delete from "@mui/icons-material/Delete"
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';

const Footer = () => {
    return (
        <Paper 
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} 
            elevation={3}
        >
            <BottomNavigation
                showLabels
            > 
                <BottomNavigationAction label="huiznaet" icon={<RestoreIcon />} />
                <BottomNavigationAction label="furazolidon" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="idinahui" icon={<LocationOnIcon />} />
                <BottomNavigationAction label="favoritnipidor" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="repepts" icon={<LocationOnIcon />} /> 
            </BottomNavigation>
        </Paper>
    )
}

export default Footer