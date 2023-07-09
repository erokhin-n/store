import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Logo2 from '../../images/svg/Logo2';																																																																		
import { NavLink } from 'react-router-dom';
import { PagesEnum } from '../../enums/enums';
import { useCheckQuery, useRemoveCookieMutation } from '../../store/apiSlice/userSlice';
import { useContext, useEffect } from 'react';
import { LoginActions } from '../../App';
import { initialState } from '../../store/reactReducer/authFormReducer';
import { MuiNavLinkProps } from '../../interface/interface';
import { Grid, MenuList } from '@mui/material/';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StoreIcon from '@mui/icons-material/Store';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {

	const {data, isLoading} = useCheckQuery()
    
	const [removeCookie] = useRemoveCookieMutation()

	const dispatch = useContext(LoginActions)

	const logout = () => {
		removeCookie()
		dispatch!({type: 'reset', payload: initialState})
	}
	  
	const MuiNavLink: React.FC<MuiNavLinkProps> = ({ to, onClick, icon, name}) => (
			<NavLink to={to} onClick={onClick}>
				<Grid container spacing={{xs:2}}>
					<Grid item>{icon}</Grid>
					<Grid item fontSize="1.5rem">{name}</Grid>
				</Grid>
			</NavLink>
		);
	  
	const exit = data?.role ? (
		<MuiNavLink to={PagesEnum.ENTER} onClick={logout} icon={<LogoutIcon fontSize="large"/>} name='exit' />
	) : (
		<MuiNavLink to={PagesEnum.ENTER} icon={<LoginIcon fontSize="large"/>} name='login' />
	);

	const shop = <MuiNavLink to={PagesEnum.SHOP} icon={<StoreIcon fontSize="large" />} name='shop' />

	const admin = data?.role === "ADMIN"  &&
		<MuiNavLink to={PagesEnum.ADMIN_PAGE} icon={<AdminPanelSettingsIcon fontSize="large"/>} name='admin panel'/>

	const superAdmin = data?.role === "SUPER_ADMIN" &&
		<MuiNavLink to={PagesEnum.SUPER_ADMIN_PAGE} icon={<SupervisorAccountIcon fontSize="large"/>} name='super admin'/>
			

	const user = data?.role === "USER" && 
		<MuiNavLink to={PagesEnum.BASKET} icon={<ShoppingBagIcon fontSize="large"/>} name='basket'/>
			  


	let pages = [exit, shop, user, admin, superAdmin ].filter(element => element !== false)

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static" sx={{bgcolor: "#D3D3D3"}}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Logo2  sx=	{{ display: { xs: 'none', md: 'flex' }, mr: 1, ml: 3, fontSize: 100 }}/>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						//  sx={{color: 'black', fontSize: 150}}
						>   

							<MenuIcon sx={{color: 'black', fontSize: 35}} />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu} 
							sx={{
								display: { xs: 'block', md: 'none' },
								'& .MuiMenu-list': {
									backgroundColor: '#DFDFDF',
									padding: 0,  
								},

								'& .MuiMenuItem-root a': {
									textDecoration: 'none',
									color: 'inherit'  
								},
							}}
						>
							{pages.map((page,index) => (
								<MenuItem  
									key={index}
									onClick={handleCloseNavMenu}
									// sx={{fontSize: '1.5rem'}}
								>
									{/* mobile */}
									{page}
								</MenuItem>
							))}
						</Menu>
					</Box>

					<Logo2 sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: 75 }} />
					<Typography
						variant="h6"
						noWrap
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontWeight: 470,
							color: '#000',
							textDecoration: 'none',
						}}
					>
						Robo Art 
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },

						'& .MuiMenuItem-root a': {
							textDecoration: 'none',
							color: 'inherit'  
						},
						}}
					>
						{pages.map((page, index) => (
							<MenuItem
								key={index}
								onClick={handleCloseNavMenu}

							>
								<Typography 
									variant="h5"
									color={"#000"}	
								>
								{/* desktop */}
									{page}
								</Typography>
							</MenuItem>
						))}
						
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
						{settings.map((setting) => (
							<MenuItem key={setting} onClick={handleCloseUserMenu}>
								<Typography textAlign="center">{setting}</Typography>
							</MenuItem>
						))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
