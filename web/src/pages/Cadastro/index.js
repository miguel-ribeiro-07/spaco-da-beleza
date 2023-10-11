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
import { updateCliente, addCliente } from '../../store/modules/cliente/actions';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import {useNavigate} from 'react-router-dom'


const Cadastro = () => {


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

  useEffect(() =>{
    setComponent('disabled', false)
  },[])

  return (
    <div style={{ background: 'linear-gradient(to bottom, #ff4dff, #FFA2FF)', margin: '0px', height: '100vh', overflow:'hidden'}}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo}  alt='Spaco da Beleza'/>
          <Typography component="h1" variant="h5">
            Cadastre-se
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="nome"
                  name="nome"
                  disabled={components.disabled}
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
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
              <Grid item xs={12}>
                <TextField
                  required
                  disabled={components.disabled}
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
                  required
                  disabled={components.disabled}
                  fullWidth
                  id="telefone"
                  label="Telefone"
                  name="telefone"
                  autoComplete="telefone"
                  value={clientecadastro.telefone}
                  onChange={(e) => setCliente('telefone', e.target.value)}
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
                  required
                  disabled={components.disabled}
                  fullWidth
                  name="senha"
                  label="Senha"
                  type="password"
                  id="senha"
                  autoComplete="new-password"
                  value={clientecadastro.senha}
                  onChange={(e) => setCliente('senha', e.target.value)}
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
                  required
                  disabled={components.disabled}
                  fullWidth
                  select
                  typeof='number'
                  name="sexo"
                  label="Sexo"
                  type="sexo"
                  id="sexo"
                  autoComplete="sexo"
                  value={clientecadastro.sexo}
                  onChange={(e) => setCliente('sexo', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'purple',
                      borderWidth: '3px',
                    },
                  }}
                >
                <MenuItem key={'F'} value={'Feminino'}>Feminino</MenuItem>
                <MenuItem key={'M'} value={'Masculino'}>Masculino</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Button
              style={{backgroundColor: '#8936b3'}}
              fullWidth
              variant="contained"
              disabled={components.disabled}
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                setComponent('disabled', true)
                save()
              }}
            >
              Cadastrar
            </Button>
            <Collapse in={components.sucessSignUp}>
              <Alert
                variant="filled"
                severity="success"
                sx={{marginBottom:2}}
                action={
                  <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => {setComponent('sucessSignUp', false)
                  navigate('/spaco-da-beleza')
                  }
                  }>
                    Faça o login!
                  </Button>
                }>
                Cadastro realizado com sucesso
              </Alert>
            </Collapse>  
            <Grid container justifyContent="flex-end">
              <Grid item>
                Já possui uma conta? 
                <Link href="/spaco-da-beleza" style={{textDecoration:"none"}} sx={{color:'white'}} >
                   Faça o login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Cadastro