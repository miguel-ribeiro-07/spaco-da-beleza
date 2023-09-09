import * as React from 'react';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {useDispatch, useSelector} from 'react-redux'
import { allServicos, updateAgendamento, filterAgenda } from '../../store/modules/agenda/actions';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import moment from 'moment'
import '../../styles.css'


const Agenda = () => {

  const dispatch = useDispatch()
  const {servicos, form, agendamento, fullagenda} = useSelector((state) => state.agenda)
  const chose = servicos.filter((e) => e._id === agendamento.servicosId)

  const setForm = (component, state) =>{
    dispatch(
      updateAgendamento({
        form: {... form, [component]:state},
      })
    )
  }

  const setAgendamento = (component, state) =>{
    dispatch(
      updateAgendamento({
        agendamento: {... agendamento, [component]:state},
      })
    )
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 375,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 6,
  };

  useEffect(() =>{
    dispatch(allServicos())
    //setAgendamento('clienteId', localStorage.getItem('@userId'))
  },[])

  function ServiceList(arr) {
    return arr.map((service) => (
      <div key={service._id}>
        <Divider />
        <ListItem>
          <ListItemText
            primary={<span style={{ fontSize: '26px' }}>{service?.nomeServico}</span>}
            secondary={<span style={{ fontSize: '16px', color:'var(--secondary)'}}>{`Preço: R$${service?.preco} - Duração: ${moment(service?.duracao).format('HH:mm')} ${moment(service?.duracao).format('HH:mm') === '00:30' ? 'min' : 'Hrs'}`}</span>}
          />
          <Button variant='contained' style={{ backgroundColor: 'var(--secondary)' }} onClick={() => {
            setForm('modal', true);
            setAgendamento('servicosId', service._id);
            dispatch(filterAgenda())
          }}>Agendar</Button>
        </ListItem>
        <Divider />
      </div>
    ));
  }

  
  console.log(agendamento, fullagenda)

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
          <Typography component="h1" variant="h4" style={{marginBottom:15}}>
           Serviços disponíveis
          </Typography>
          <List sx={{ width: '100%', maxWidth: 400}}>
            {ServiceList(servicos)}
          </List>
          <Modal
            open={form.modal}
            onClose={() => setForm('modal', false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Grid container spacing={1} item>
                  <Grid item xs={11}>
                    <Typography id="modal-modal-title" variant="h4" component="h2" marginBottom={5} marginTop={0.5}>
                      Agende seu horário
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton size="large" onClick={() =>{setForm('modal', false)}}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                  <Grid>
                  <List>
                  <Divider />
                  <ListItem>
                      <ListItemText
                        primary={<span style={{ fontSize: '22px' }}>{`Nome do serviço: ${chose[0]?.nomeServico}`}</span>}
                        secondary={<span style={{ fontSize: '19px'}}>{`Preço: R$${chose[0]?.preco}  - Duração: ${moment(chose[0]?.duracao).format('HH:mm')} ${moment(chose[0]?.duracao).format('HH:mm') === '00:30' ? 'min' : 'Hrs'}`}</span>}
                      />
                    </ListItem>
                    <Divider />
                  </List>

                  </Grid>
              </Grid>
            </Box>
          </Modal>
        </Box>
      </Container>
  );
}

export default Agenda