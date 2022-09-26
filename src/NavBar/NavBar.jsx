import { useState } from 'react';
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
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
// import axios from 'axios'

// const pages = ['Units', 'Vents', 'Surveys', 'Equipment', 'Technicians'];
const settings = ['Logout'];

const NavBar = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { logout, isAuthenticated } = useAuth0();
  // const { setTechnicians, setUserProfile } = props

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);

    if(page === 'Equipment'){
      props.setShow({...props.defaultShow, equipment: true})
    }
    else if(page === 'Vents'){
      props.setShow({...props.defaultShow, ventList: true})
    }
    else if(page === 'Surveys'){
      props.setShow({...props.defaultShow, ventSurveyList: true})
    }
    else if(page === 'Units'){
      props.setShow({...props.defaultShow, unitList: true})
    }
    props.setSelectedUnit({unitId: ''})
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);

  };
  const handleProfileClick = (setting) => {
    if(setting === 'Logout'){
      logout({ returnTo: window.location.origin })
    }
  }
  // useEffect(()=> {
  //   const getTechs = async () => {
  //       let techList= await axios.get(`${process.env.REACT_APP_DATABASE}/technician`);
  //       if(isAuthenticated){
  //         let currentUser = techList.data.filter(tech => tech.technicianEmail === user.email)
  //         setUserProfile({...currentUser[0], user})
  //       }
  //       setTechnicians(techList.data)
  //   }
  //   let ignore = false;
  //   if (!ignore)  getTechs()
  //   return () => { ignore = true; }
  //   // getTechs();
  // }, [isAuthenticated, user, setTechnicians, setUserProfile]);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              <MenuItem key={'Units'}>
                <Link to = '/Units' style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center">Units</Typography>
                </Link>
              </MenuItem>
              <MenuItem key={'Vents'} onClick={()=> handleCloseNavMenu('Vents')}>
                <Link to = '/Vents' style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center">Vents</Typography>
                </Link>
              </MenuItem>
              <MenuItem key={'Surveys'} onClick={()=> handleCloseNavMenu('Surveys')}>
                <Link to = '/Surveys' style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center">Surveys</Typography>
                </Link>
              </MenuItem>
              <MenuItem key={'Equipment'}>
              <Link to = '/Equipment' style={{ textDecoration: 'none' }}>
                <Typography textAlign="center">Equipment</Typography>
              </Link>
              </MenuItem>
              {(props.userProfile.technicianRole === 'Admin' ||  props.userProfile.technicianRole === 'Program Manager' || props.userProfile.nickname === 'anthonymorton760') && (
              <MenuItem key={'Technicians'}>
                <Link to = '/Technicians' style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center">Technicians</Typography>
                </Link>
              </MenuItem>
              )}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link to = '/Units' style={{ textDecoration: 'none' }}>
            <Button
              key={'Units'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Units
            </Button>
          </Link>
          <Link to = '/Vents' style={{ textDecoration: 'none' }}>
            <Button
              key={'Vents'}
              onClick={()=> handleCloseNavMenu('Vents')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Vents
            </Button>
          </Link>
            <Link to = '/Surveys' style={{ textDecoration: 'none' }}>
              <Button
                key={'Surveys'}
                onClick={()=> handleCloseNavMenu('Surveys')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Surveys
              </Button>
            </Link>
            <Link to = '/Equipment' style={{ textDecoration: 'none' }}>
              <Button
                key={'Equipment'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Equipment
              </Button>
            </Link>
            {(props.userProfile.technicianRole === 'Admin' ||  props.userProfile.technicianRole === 'Program Manager' || props.userProfile.nickname === 'anthonymorton760') && (
            <Link to = '/Technicians' style={{ textDecoration: 'none' }}>
              <Button
                key={'Technicians'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Technicians
              </Button>
            </Link>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="My Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {isAuthenticated &&
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
                <MenuItem key={setting}>
                  <Typography onClick={() => handleProfileClick(setting)} textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;