import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logotipo.png'
import { updateCliente, filterCliente } from '../../store/modules/cliente/actions';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import {useNavigate} from 'react-router-dom'


const Login = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {clientelogin, components} = useSelector((state) => state.cliente)
  const cltId = localStorage.getItem('@userId')

  const entrar = () =>{
     dispatch(filterCliente())
  }
  
  const setClienteLogin = (key, value) =>{
    dispatch(updateCliente({
      clientelogin: {...clientelogin, [key]:value},
    }))
  }



  const setComponent = (component, state) =>{
    dispatch(
      updateCliente({
        components: {... components, [component]:state},
      })
    )
  }

  useEffect(() =>{
    if(cltId === '6490bb2b6ca1299fd2616db5'){
      navigate('/agendamentos')
    }else if(clientelogin.found === true){
      navigate('/agenda')
    }
  },[])

  useEffect(() =>{
    if(cltId === '6490bb2b6ca1299fd2616db5'){
      navigate('/agendamentos')
      setClienteLogin('found', null)
      setComponent('notLogin', false)
    }else if(clientelogin.found === true){
      navigate('/agenda')
      setClienteLogin('found', null)
      setComponent('notLogin', false)
    }else if(clientelogin.found == false){
      setComponent('notLogin', true)
    }
  },[cltId, clientelogin.found])


  return (
    <div style={{ background: 'linear-gradient(to bottom, #ff4dff, #FFA2FF)', margin: '0px', height: '100vh', overflow:'hidden'}}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo}  alt='Spaco da Beleza'/>
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={clientelogin.email}
                  onChange={(e) => setClienteLogin('email', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'purple',
                      borderWidth: '3px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="senha"
                  name="senha"
                  required
                  type='password'
                  fullWidth
                  id="senha"
                  label="Senha"
                  autoFocus
                  value={clientelogin.nome}
                  onChange={(e) => setClienteLogin('senha', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'purple',
                      borderWidth: '3px',
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              style={{backgroundColor: '#8936b3'}}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => entrar()}
            >
              Entrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Não possui cadastro? 
                <Link href="/cadastro" style={{textDecoration:"none"}} sx={{color:'white'}}>
                Cadastre-se
                </Link>
              </Grid>
            </Grid>
            <Collapse in={components.notLogin}>
              <Alert
                variant="filled"
                severity="error"
                action={
                  <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => {
                    setComponent('notLogin', false)
                    setClienteLogin('found', null)
                  }
                  }>
                    Ok!
                  </Button>
                }>
                Usuário ou senha estão incorretos!
              </Alert>
            </Collapse>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login