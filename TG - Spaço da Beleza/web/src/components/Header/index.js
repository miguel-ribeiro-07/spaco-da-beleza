import logo from '../../assets/logotipo.png'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupIcon from '@mui/icons-material/Group';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';

const Header = () =>{
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <Box>
            <AppBar style={{ "background-image": "linear-gradient(to bottom, #ff4dff, #FFA2FF)" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-controls="menu-appbar"
                        aria-label="menu"
                        onClick={handleMenu}
                        sx={{mr:2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <EventAvailableIcon/><Link to="/"></Link>Agendamentos
                        </MenuItem>
                        <MenuItem onClick={handleClose}><GroupIcon/>
                            <Link to="/clientes"></Link>Clientes</MenuItem>
                        <MenuItem onClick={handleClose}><ContentCutIcon/>Servicos</MenuItem>
                        <MenuItem onClick={handleClose}><AccessTimeIcon/>Horarios</MenuItem>
                    </Menu>

                    <img src={logo} width='210px' height='40px' alt='Spaco da Beleza'/>
                    <Box flexGrow={1} />
                    <IconButton
                        size="large"
                        aria-label="account of current user">
                        <DarkModeIcon/>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="account of current user">
                        <AccountCircle/>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="logout">
                        <LogoutIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header