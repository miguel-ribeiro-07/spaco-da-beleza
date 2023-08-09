import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MenuItem } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
import { updateServico, getServico, updateServicoDB } from '../../store/modules/servico/actions';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Divider from '@mui/material/Divider';



const EditarServico = () => {

  const navigate = useNavigate()
  const servicoId = useParams()
  const dispatch = useDispatch()

  const {servico, servicobanco, components} = useSelector((state) => state.servico)

  const setServico = (key, value) =>{
    dispatch(updateServico({
      servico: {...servico, [key]:value},
    }))
  }

  const setComponent = (component, state) =>{
    dispatch(
      updateServico({
        components: {... components, [component]:state},
      })
    )
  }

  
  useEffect(() =>{
    dispatch(updateServico({
      id:servicoId.id
    }))
    dispatch(getServico())
  }, [])

  const update = () =>{
    dispatch(updateServicoDB())
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
           Dados do serviço
          </Typography>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemAvatar>
                <ContentCutIcon/>
              </ListItemAvatar>
              <ListItemText primary="Nome" secondary={servicobanco.nomeServico} />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemAvatar>
                <DescriptionIcon/>
              </ListItemAvatar>
              <ListItemText primary="Descrição do serviço" secondary={servicobanco.descricao} />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemAvatar>
                  <AttachMoneyIcon/>
              </ListItemAvatar>
              <ListItemText primary="Preço" secondary={`R$${servicobanco.preco}`} />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemAvatar>
                <CheckIcon/>
              </ListItemAvatar>
              <ListItemText primary="Status atual" secondary={servicobanco.status} />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemAvatar>
                <AccessTimeIcon/>
              </ListItemAvatar>
              <ListItemText primary="Duração do serviço" secondary={`${moment(servicobanco.duracao).format('HH:mm')} Hrs`} />
            </ListItem>
            <Divider/>
          </List>

          <Typography component="h1" variant="h5">
           Editar servico
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="nomeServico"
                  name="nomeServico"
                  fullWidth
                  disabled={components.disabled}
                  id="nomeServico"
                  label="Nome Servico"
                  autoFocus
                  value={servico.nomeServico}
                  onChange={(e) => setServico('nomeServico', e.target.value)}
                />
                
              </Grid>
              <Grid item xs={12}>
                <TextField                  
                  required
                  fullWidth
                  id="descricao"
                  maxRows={3}
                  multiline
                  disabled={components.disabled}
                  label="Descrição do serviço"
                  placeholder='Ex: Depilação com cera, coloração completa...'
                  name="descricao"
                  autoComplete="descricao"
                  value={servico.descricao}
                  onChange={(e) => setServico('descricao', e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  disabled={components.disabled}
                  id="preco"
                  label="Preço"
                  name="preco"
                  type="number"
                  autoComplete="preco"
                  value={servico.preco}
                  onChange={(e) => setServico('preco', e.target.value.replace(",", "."))}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  disabled={components.disabled}
                  select
                  name="status"
                  label="Status"
                  type="status"
                  id="status"
                  autoComplete="status"
                  value={servico.status}
                  onChange={(e) => setServico('status', e.target.value)}
                >
                <MenuItem key={'A'} value={'A'}>Ativo</MenuItem>
                <MenuItem key={'I'} value={'I'}>Inativo</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                    required
                    fullWidth
                    disabled={components.disabled}
                    select
                    name="duracao"
                    label="Duração"
                    type="duracao"
                    id="duracao"
                    autoComplete="duracao"
                    value={servico.duracao}
                    onChange={(e) => setServico('duracao', e.target.value)}
                  >
                  <MenuItem key={'0.3'} value={moment('00:30', 'HH:mm'). format()}>00:30</MenuItem>
                  <MenuItem key={'1.0'} value={moment('01:00', 'HH:mm'). format()}>01:00</MenuItem>
                  <MenuItem key={'1.3'} value={moment('01:30', 'HH:mm'). format()}>01:30</MenuItem>
                  <MenuItem key={'2.0'} value={moment('02:00', 'HH:mm'). format()}>02:00</MenuItem>
                  <MenuItem key={'2.3'} value={moment('02:30', 'HH:mm'). format()}>02:30</MenuItem>
                  <MenuItem key={'3.0'} value={moment('03:00', 'HH:mm'). format()}>03:00</MenuItem>
                  <MenuItem key={'3.3'} value={moment('03:30', 'HH:mm'). format()}>03:30</MenuItem>
                  <MenuItem key={'4.0'} value={moment('04:00', 'HH:mm'). format()}>04:00</MenuItem>
                  <MenuItem key={'4.3'} value={moment('04:30', 'HH:mm'). format()}>04:30</MenuItem>
                  <MenuItem key={'5.0'} value={moment('05:00', 'HH:mm'). format()}>05:00</MenuItem>
                  <MenuItem key={'5.3'} value={moment('05:30', 'HH:mm'). format()}>05:30</MenuItem>
                  <MenuItem key={'6.0'} value={moment('06:00', 'HH:mm'). format()}>06:00</MenuItem>
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
              Atualizar Serviço
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
                  navigate('/servicos')
                  }
                  }>
                    Voltar para servicos!
                  </Button>
                }>
                Serviço atualizado com sucesso
              </Alert>
            </Collapse>  
          </Box>
        </Box>
      </Container>
  );
}

export default EditarServico