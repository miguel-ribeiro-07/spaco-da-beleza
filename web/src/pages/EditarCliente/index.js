import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MenuItem } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
import { updateCliente, getCliente, updateClienteDB } from '../../store/modules/cliente/actions';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import {useNavigate} from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WcIcon from '@mui/icons-material/Wc';
import Divider from '@mui/material/Divider';
import '../../styles.css'


const EditarCliente = () => {

  const navigate = useNavigate()
  const cltId = useParams()
  const dispatch = useDispatch()

  const {cliente, clientebanco, components} = useSelector((state) => state.cliente)

  const setCliente = (key, value) =>{
    dispatch(updateCliente({
      cliente: {...cliente, [key]:value},
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
    dispatch(updateCliente({
      id:cltId.id
    }))
    dispatch(getCliente())
  }, [])

  const update = () =>{
    dispatch(updateClienteDB())
  }

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center',
          }}
        >
          <Typography component="h1" variant="h5">
           Dados do cliente
          </Typography>
          <List sx={{ width: '100%', maxWidth: 360}}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Nome" secondary={clientebanco.nome} />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EmailIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="E-mail" secondary={clientebanco.email} />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                <PhoneIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Telefone" secondary={clientebanco.telefone} />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WcIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Sexo" secondary={clientebanco.sexo} />
            </ListItem>
          </List>

          <Typography component="h1" variant="h5">
           Editar Cliente
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="nome"
                  name="nome"
                  fullWidth
                  disabled={components.disabled}
                  id="nome"
                  label="Nome"
                  autoFocus
                  value={cliente.nome}
                  onChange={(e) => setCliente('nome', e.target.value)}
                />
                
              </Grid>
              <Grid item xs={12}>
                <TextField                  
                  required
                  fullWidth
                  id="email"
                  disabled={components.disabled}
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={cliente.email}
                  onChange={(e) => setCliente('email', e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  disabled={components.disabled}
                  id="telefone"
                  label="Telefone"
                  name="telefone"
                  autoComplete="telefone"
                  value={cliente.telefone}
                  onChange={(e) => setCliente('telefone', e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  disabled={components.disabled}
                  select
                  name="sexo"
                  label="Sexo"
                  type="sexo"
                  id="sexo"
                  autoComplete="sexo"
                  value={cliente.sexo}
                  onChange={(e) => setCliente('sexo', e.target.value)}
                >
                <MenuItem key={'F'} value={'Feminino'}>Feminino</MenuItem>
                <MenuItem key={'M'} value={'Masculino'}>Masculino</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Button
              fullWidth
              disabled={components.disabled}
              variant="contained"
              onClick={() => update()}
              sx={{ mt: 3, mb: 2, backgroundColor: 'var(--secondary)'}}
            >
              Atualizar Cliente
            </Button>
            <Collapse in={components.sucessEdit}>
              <Alert
                variant="filled"
                severity="success"
                action={
                  <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => {setComponent('sucessEdit', false)
                  navigate('/clientes')
                  }
                  }>
                    Voltar para clientes!
                  </Button>
                }>
                Cliente atualizado com sucesso
              </Alert>
            </Collapse>  
          </Box>
        </Box>
      </Container>
  );
}

export default EditarCliente