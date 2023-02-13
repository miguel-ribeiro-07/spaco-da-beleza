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
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import {useNavigate} from 'react-router-dom'




const CriarServico = () => {

  const navigate = useNavigate()
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
           Adicionar novo serviço
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
                  label="Nome do serviço"
                  placeholder='Ex: Depilação, escova, maquiagem, mão e pé...'
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
                  label="Descrição do serviço"
                  placeholder='Ex: Depilação com cera, coloração completa...'
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
                  label="Preço"
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
                  typeof='number'
                  name="sexo"
                  label="Duração"
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
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar serviço
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

export default CriarServico