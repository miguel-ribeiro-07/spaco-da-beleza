import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logotipo.png'
import { updateCliente, addCliente } from '../../store/modules/cliente/actions';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import {useNavigate} from 'react-router-dom'


const Login = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {clientecadastro, components} = useSelector((state) => state.cliente)

  const save = () => {
    dispatch(addCliente())
  }

  const setCliente = (key, value) =>{
    dispatch(updateCliente({
      clientecadastro: {...clientecadastro, [key]:value},
    }))
  }

  const setComponent = (component, state) =>{
    dispatch(
      updateCliente({
        components: {... components, [component]:state},
      })
    )
  }
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
                  value={clientecadastro.email}
                  onChange={(e) => setCliente('email', e.target.value)}
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
                  value={clientecadastro.nome}
                  onChange={(e) => setCliente('nome', e.target.value)}
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
              onClick={() => save()}
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
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login