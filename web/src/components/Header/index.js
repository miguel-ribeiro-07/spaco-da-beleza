import logo from '../../assets/logotipo.png'
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {updateCliente} from '../../store/modules/cliente/actions';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupIcon from '@mui/icons-material/Group';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import '../../styles.css'

const Header = () =>{

    const location = useLocation()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cltId = localStorage.getItem('@userId')
    let [adm, setAdm] = React.useState(null)
    const {clientelogin} = useSelector((state) => state.cliente)

    
    const setClienteLogin = (key, value) =>{
        dispatch(updateCliente({
        clientelogin: {...clientelogin, [key]:value},
        }))
    }



    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(()=> {
        if (cltId === '6490bb2b6ca1299fd2616db5') {
            setAdm(true)
        }else{
            setAdm(false)
        }
    },[cltId])


    return (
        <Box>
            <AppBar sx={location.pathname === '/cadastro' || location.pathname === '/spaco-da-beleza/' ? 'display:none':'display:block'}
             position='static' 
             style={{ "backgroundImage": "linear-gradient(to bottom, #ff4dff, #FFA2FF)", borderRadius: "15px", marginLeft: 2, marginTop: 2, marginRight: 2 }}>
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
                        <Link to="/agendamentos" style={{textDecoration:"none", display:adm === true ? 'block' : 'none'}}>
                            <MenuItem onClick={handleClose} style={{"color":"#8936b3", padding:"15px 15px"}}>
                                <EventAvailableIcon style={{padding:"0px 10px"}}/>Agendamentos
                            </MenuItem>
                        </Link>
                        <Link to="/clientes" style={{textDecoration:"none", display:adm === true ? 'block' : 'none'}}>
                            <MenuItem onClick={handleClose} style={{"color":"#8936b3", padding:"15px 15px"}}>
                                <GroupIcon style={{padding:"0px 10px"}}/>Clientes
                            </MenuItem>
                        </Link>
                        <Link to="/servicos"style={{textDecoration:"none", display:adm === true ? 'block' : 'none'}}>
                            <MenuItem onClick={handleClose} style={{"color":"#8936b3", padding:"15px 15px"}}>
                                <ContentCutIcon style={{padding:"0px 10px"}}/>Serviços
                            </MenuItem>
                        </Link>
                        <Link to="/horarios" style={{textDecoration:"none", display:adm === true ? 'block' : 'none'}}>
                            <MenuItem onClick={handleClose} style={{"color":"#8936b3", padding:"15px 15px"}}>
                                <AccessTimeIcon style={{padding:"0px 10px"}}/>Horarios
                            </MenuItem>
                        </Link>
                        <Link to="/agenda" style={{textDecoration:"none", display:adm === true ? 'none' : 'block'}}>
                            <MenuItem onClick={handleClose} style={{"color":"#8936b3", padding:"15px 15px"}}>
                                <CalendarMonthIcon style={{padding:"0px 10px"}}/>Agenda
                            </MenuItem>
                        </Link>
                    </Menu>

                    <img src={logo} width='210px' height='40px' alt='Spaco da Beleza'/>
                    <Box flexGrow={1} />
                    <IconButton
                        size="large"
                        onClick={() =>{
                            navigate(`/editar-cliente/${cltId}`)
                        }}
                        aria-label="account of current user">
                        <AccountCircle/>
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            localStorage.clear()
                            setClienteLogin('senha', '')
                            setAdm(null)
                            navigate('/spaco-da-beleza')}}
                        size="large"
                        aria-label="logout"
                        >
                        <LogoutIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header