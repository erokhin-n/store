import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Delete from "@mui/icons-material/Delete"

const Footer = () => {
    return (
        <BottomNavigation
            
        > 
            <BottomNavigationAction label="Recents" icon={<Delete />} /> 
        </BottomNavigation>
    )
}

export default Footer