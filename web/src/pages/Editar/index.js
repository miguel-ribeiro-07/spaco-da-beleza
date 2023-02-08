import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MenuItem } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
import { updateCliente, getCliente } from '../../store/modules/cliente/action';
import { useParams } from 'react-router';
import { useEffect } from 'react';



const Editar = () => {

  const cltId = useParams()
  const dispatch = useDispatch()

  const {cliente, clientebanco} = useSelector((state) => state.cliente)

  const setCliente = (key, value) =>{
    dispatch(updateCliente({
      cliente: {...cliente, [key]:value},
    }))
  }

  useEffect(() =>{
    dispatch(getCliente())
  }, [])

  console.log(clientebanco)

  return (
      <Container component="main" maxWidth="xs">
        <Box
        sx={{
          marginTop:8,
          display:'block'

        }}
        >
          <Typography variant='h5' marginBottom={1}>Nome: {clientebanco.nome}</Typography>
          <Typography variant='h5' marginBottom={1}>Email: {clientebanco.email}</Typography>
          <Typography variant='h5' marginBottom={1}>Telefone: {clientebanco.telefone}</Typography>
          <Typography variant='h5' marginBottom={1}>Sexo: {clientebanco.sexo}</Typography>
        </Box>

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center',
          }}
        >
          <Typography component="h1" variant="h5">
           Editar Cliente
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="nome"
                  name="nome"
                  required
                  fullWidth
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
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={cliente.email}
                  onChange={(e) => setCliente('email', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="telefone"
                  label="Telefone"
                  name="telefone"
                  autoComplete="telefone"
                  value={cliente.telefone}
                  onChange={(e) => setCliente('telefone', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  select
                  typeof='number'
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Atualizar
            </Button>
          </Box>
        </Box>
      </Container>
  );
}

export default Editar