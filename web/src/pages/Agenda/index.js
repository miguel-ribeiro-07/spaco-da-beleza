import * as React from 'react';
import { useState } from 'react';
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
import moment from 'moment/min/moment-with-locales'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import '../../styles.css'
import ferramentas from '../../ferramentas';
moment.locale('pt-br')


const Agenda = () => {

  const dispatch = useDispatch()
  const {servicos, form, agendamento, fullagenda} = useSelector((state) => state.agenda)
  const chose = servicos.filter((e) => e._id === agendamento.servicosId)
  const activeServices = servicos.filter((e) => e.status === "A")
  const dataSelecionada = moment(agendamento.data).format('YYYY-MM-DD')
  const horaSelecionada = moment(agendamento.data).format('HH:mm')

  const {horariosDisponiveis} = ferramentas.selectAgendamento(fullagenda, dataSelecionada)

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

  const setAgendaStatus = (value, isTime = false) => {
    const {horariosDisponiveis} = ferramentas.selectAgendamento(fullagenda, isTime ? dataSelecionada : value)
    
    let data = !isTime ? `${value}T${horariosDisponiveis[0]}` : `${dataSelecionada}T${value}`
    setAgendamento('data', data)
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
    p: 5,
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
    borderColor: '#8936b3', // Defina a cor da borda desejada aqui
    borderWidth: '1px', // Defina a largura da borda, se necessário
    borderStyle: 'solid'
  }));

  useEffect(() =>{
    dispatch(allServicos())
    setAgendamento('clienteId', localStorage.getItem('@userId'))
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

  function ListDatas(arr) {
    if (form.error === true) {
      return <Typography variant="h5" component="h2" marginTop={0.5}>O proprietário não disponibilizou horários para esse serviço</Typography>
    } else{
        return arr.map((data) => (
          <div key={Object.keys(data)}>
            <Item 
              style={{
                color: dataSelecionada === Object.keys(data)[0] ? 'white' : 'black',
                backgroundColor: dataSelecionada === Object.keys(data)[0] ? '#8936b3' : 'white',
                fontWeight: dataSelecionada === Object.keys(data)[0] ? 'bold' : 'normal',
                }}
              onClick={() => {
                setAgendaStatus(Object.keys(data)[0], false)
              }}
            >{`${ferramentas.diasSemana[moment(Object.keys(data)[0]).day()]} ${moment(Object.keys(data)[0]).format('DD/MMM')}`}</Item>
          </div>
        ));
      }
  }

  function ListHorarios(arr) {
    if (form.error === true) {
      return <Typography variant="h5" component="h2" marginTop={0.5}>O proprietário não disponibilizou horários para esse serviço</Typography>
    } else{
        return arr.map((horario) => (
          <div key={`Chave ${horario}`} >
            <Item
              style={{
                color: horaSelecionada === horario ? 'white' : 'black',
                backgroundColor: horaSelecionada === horario ? '#8936b3' : 'white',
                fontWeight: horaSelecionada === horario ? 'bold' : 'normal',
              }}
              onClick={() => {
                setAgendaStatus(horario, true)
              }}
            >{horario}</Item>
          </div>
        ));
      }
  }

  console.log(agendamento)



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
            {ServiceList(activeServices)}
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
                    <Typography id="modal-modal-title" variant="h4" component="h2" marginBottom={2} marginTop={0.5}>
                      Agende seu horário
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton size="large" onClick={() =>{setForm('modal', false)}}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                  <List>
                  <Divider />
                  <ListItem>
                      <ListItemText
                        primary={<span style={{ fontSize: '22px' }}>{`Nome do serviço: ${chose[0]?.nomeServico}`}</span>}
                        secondary={<span style={{ fontSize: '19px'}}>{`Preço: R$${chose[0]?.preco}  - Duração: ${moment(chose[0]?.duracao).format('HH:mm')} ${moment(chose[0]?.duracao).format('HH:mm') === '00:30' ? 'min' : 'Hrs'}`}</span>}
                      />
                    </ListItem>
                  <Divider />
                  <Stack spacing={{ xs:1}} direction="row" flexWrap='wrap' >
                    <Typography id="modal-modal-title" variant="h4" marginBottom={3} marginTop={1} marginLeft={1}>
                        Selecione uma data
                    </Typography>
                      {ListDatas(fullagenda)}
                  </Stack>
                  <Divider sx={{marginTop:2}}/>
                  <Stack spacing={{ xs:1}} direction="row" flexWrap='wrap' >
                    <Typography id="modal-modal-title" variant="h4" marginBottom={3} marginTop={1} marginLeft={1}>
                        Selecione um horário
                    </Typography>
                    {ListHorarios(horariosDisponiveis)}
                  </Stack>
                  <Divider sx={{marginTop:2}}/>
                  <Button  sx={{marginTop:2, marginLeft:1, backgroundColor: '#8936b3', display:`${form.error === true ? 'none' : 'block' }`}} variant='contained'>CONFIRMAR AGENDAMENTO</Button>
                  </List>
              </Grid>
            </Box>
          </Modal>
        </Box>
      </Container>
  );
}

export default Agenda