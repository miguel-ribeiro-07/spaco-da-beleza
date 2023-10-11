import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logotipo.png'
import { updateCliente, filterClienteMail, updatePassword } from '../../store/modules/cliente/actions';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import {useNavigate} from 'react-router-dom'


const RedefinirSenha = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {clientelogin, components} = useSelector((state) => state.cliente)
  let [confirmPass, setConfirmPass] = React.useState('')

  const filtrar = () =>{
    dispatch(filterClienteMail())
  }

  const alterar = () =>{
    dispatch(updatePassword())
  }

  const setCliente = (key, value) =>{
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
    setComponent('sucessSignUp', false)
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
          <Typography component="h1" variant="h5" marginTop={5}>
            Redefinição de senha
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
            {clientelogin.found === true ? (
                // Caso o email seja encontrado, renderize os campos de senha
                <>
                <Grid item xs={12} marginBottom={2}>
                <TextField
                    required
                    type="password"
                    disabled={components.disabled}
                    fullWidth
                    id="senha"
                    label="Nova senha"
                    name="senha"
                    autoComplete="senha"
                    value={clientelogin.senha}
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
                    type="password"
                    disabled={components.disabled}
                    fullWidth
                    error={clientelogin.senha !== confirmPass ? true : false}
                    helperText={clientelogin.senha !== confirmPass ? 'As senhas não coincidem' : false}
                    id="confirmPass"
                    label="Confirme sua senha"
                    name="confirmPass"
                    autoComplete="confirmPass"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'purple',
                        borderWidth: '3px',
                    },
                    }}
                />
                </Grid>
                <Button
                    style={{backgroundColor: '#8936b3'}}
                    fullWidth
                    variant="contained"
                    disabled={clientelogin.senha !== confirmPass || clientelogin.senha === '' || confirmPass === '' || components.disabled === true ? true : false}
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {  
                        alterar()
                    }}
                    >
                    Alterar senha
                </Button>
                </>
            ) : (
                // Caso o email não seja encontrado, renderize o campo de e-mail
                <>
                <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={clientelogin.email}
                onChange={(e) => setCliente('email', e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'purple',
                    borderWidth: '3px',
                    },
                }}
                />
                <Button
                    style={{backgroundColor: '#8936b3'}}
                    fullWidth
                    variant="contained"
                    disabled={clientelogin.email === ''}
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                        filtrar()
                    }}
                    >
                    Solicitar redefinição
                </Button>
                </>
            )}
            </Grid>
            </Grid>
            <Collapse in={components.sucessSignUp}>
              <Alert
                variant="filled"
                severity="error"
                sx={{marginBottom:2}}
                action={
                  <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => {
                    setComponent('sucessSignUp', false)
                    navigate('/cadastro')
                  }
                  }>
                    Cadastre-se!
                  </Button>
                }>
                Email não localizado!
              </Alert>
            </Collapse>
            <Collapse in={components.sucessEdit}>
              <Alert
                variant="filled"
                severity="success"
                sx={{marginBottom:2}}
                >
                Alteração de senha feita com sucesso!
              </Alert>
            </Collapse>  
            <Grid container justifyContent="flex-end">
              <Grid item marginTop={5}>
                <Link href="/spaco-da-beleza" style={{textDecoration:"none"}} sx={{color:'white'}} >
                   Clique aqui para fazer o login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default RedefinirSenha