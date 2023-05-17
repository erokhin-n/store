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
import Logo_2 from '../../images/svg/Logo_2';
import { NavLink } from 'react-router-dom';
import { PagesEnum } from '../../enums/enums';
import { useCheckQuery, useRemoveCookieMutation } from '../../store/apiSlice/userSlice';
import { useContext } from 'react';
import { LoginActions } from '../../App';
import { initialState } from '../../store/reactReducer/authFormReducer';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {

	const {data, isLoading} = useCheckQuery()
    
	const [removeCookie] = useRemoveCookieMutation()

	const dispatch = useContext(LoginActions)

	const logout = () => {
		removeCookie()
		dispatch!({type: 'reset', payload: initialState})
	}

	const exit = data?.role ?
		<NavLink
			className={ "navbar_element"}
			to={PagesEnum.ENTER}
			onClick={() => logout()}
		>   
			{/* <Locker /> */}
			<span className="navbarText">выйти</span>        
		</NavLink>
		:
		<NavLink
			className={ "navbar_element"}
			to={PagesEnum.ENTER}
		>
			<span>войти</span>
		</NavLink>

	const shop = <NavLink
			to={PagesEnum.SHOP}
		>
			<span >
				магазин
			</span>
		</NavLink>

	const admin = data?.role === "ADMIN"  ? 
		<NavLink
			className={ "navbar_element" } 
			to={PagesEnum.ADMIN_PAGE}
		>
			<span className="navbarText">админ панель</span>
		</NavLink>
		:
		null

	const superAdmin = data?.role === "SUPER_ADMIN" ?
		<NavLink
			className={ "navbar_element" } 
			to={PagesEnum.SUPER_ADMIN_PAGE}
		>
			<span className="navbarText">super admin page</span>
		</NavLink>
		:
		null

	function testadm() {
		if(admin) {
				
		}
	}

	const user = data?.role === "USER" && 
		<NavLink
			className={ "navbar_element" } 
			to={PagesEnum.BASKET}
		>
			{/* <BasketIcon /> */}
			<span className="navbarText">корзина</span>
		</NavLink>


	let pages = [exit, shop];

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

	console.log(pages)

  return (
    <AppBar position="static" sx={{bgcolor: "#D3D3D3"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            //   sx={{color: 'black', fontSize: 150}}
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
              }}
            >
              {pages.map((page) => (
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Logo_2 sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: 75 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: '#000',
              textDecoration: 'none',
            }}
          >
            Robo Art 
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                // key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
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
