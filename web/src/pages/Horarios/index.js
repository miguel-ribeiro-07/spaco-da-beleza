import * as React from 'react';
import {useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { allHorarios, allServicos, updateHorario, removeHorario, resetHorario } from '../../store/modules/horario/actions';
import {useDispatch, useSelector} from 'react-redux'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import 'moment/locale/pt-br'

moment.locale('pt-br')
const localizer = momentLocalizer(moment)

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems:'center'
};

const Horarios = () =>{

  const diasSemanaData = [
    new Date(2023, 2, 12, 0, 0, 0, 0),
    new Date(2023, 2, 13, 0, 0, 0, 0),
    new Date(2023, 2, 14, 0, 0, 0, 0),
    new Date(2023, 2, 15, 0, 0, 0, 0),
    new Date(2023, 2, 16, 0, 0, 0, 0),
    new Date(2023, 2, 17, 0, 0, 0, 0),
    new Date(2023, 2, 18, 0, 0, 0, 0),
  ]

  const dispatch = useDispatch()
  const {horarios, horario, servicos, components} = useSelector((state) => state.horario)


  const setComponent = (component, state) =>{
    dispatch(
      updateHorario({
        components: {... components, [component]:state},
      })
    )
  }

  const setHorario = ''

  useEffect(() =>{
    dispatch(allHorarios())
    dispatch(allServicos())
  }, [])

  
  const formatEvents = horarios.map((horario) => 
  horario.diaSemana.map((dia) => ({
    resource: horario,
    title:`Qtd de Serviços ${horario.servicoId.length}`,
    start: new Date(
      diasSemanaData[dia].setHours(
        parseInt(moment(horario.horaInicio).format('HH')),
        parseInt(moment(horario.horaInicio).format('mm'))
      )
    ),
    end: new Date(
      diasSemanaData[dia].setHours(
        parseInt(moment(horario.horaFim).format('HH')),
        parseInt(moment(horario.horaFim).format('mm'))
      )
    )

  }))).flat()

  console.log(horario, components.modal)

    return (
        <div style={{ height: 600, width: '100%' }}>
          <h1>Horarios</h1>
          <Calendar
            onSelectEvent={(e) => {
              dispatch(updateHorario({
                horario: e.resource
              }))
              setComponent('modal', true)
            }}
            localizer={localizer}
            events={formatEvents}
            toolbar={false}
            formats={{
              dateFormat:'dd',
              dayFormat:(date, culture, localizer) =>
              localizer.format(date, 'dddd', culture)
            }}
            popup
            selectable
            date={diasSemanaData[moment().day()]}
            view='week'
            style={{ height: 600 }}
            />
            <Modal
                open={components.modal}
                onClose={() => setComponent('modal', false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Atualizar horário
                  </Typography>
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
                  value={''}
                  onChange={(e) => setHorario('nomeServico', e.target.value)}
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
                  value={''}
                  onChange={(e) => setHorario('descricao', e.target.value)}
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
                  value={''}
                  onChange={(e) => setHorario('preco', e.target.value.replace(",", "."))}
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
                  value={''}
                  onChange={(e) => setHorario('status', e.target.value)}
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
                    value={''}
                    onChange={(e) => setHorario('duracao', e.target.value)}
                  >
                  </TextField>
              </Grid>
              <Grid item xs={3}><Button variant='outlined'>Atualizar</Button></Grid>
            </Grid>
                </Box>
            </Modal>
        </div>
      );
    
}

export default Horarios