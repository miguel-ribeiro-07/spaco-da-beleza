import * as React from 'react';
import {useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { allHorarios, allServicos, updateHorario, removeHorario, resetHorario } from '../../store/modules/horario/actions';
import {useDispatch, useSelector} from 'react-redux'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import 'moment/locale/pt-br'
import Autocomplete from '@mui/material/Autocomplete';


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
  p: 6,
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

  const opcoesDias = [
    { dia: 'Domingo', valor: 0 },
    { dia: 'Segunda', valor: 1 },
    { dia: 'Terça', valor: 2 },
    { dia: 'Quarta', valor: 3 },
    { dia: 'Quinta', valor: 4 },
    { dia: 'Sexta', valor: 5 },
    { dia: 'Sábado', valor: 6 }
  ];

  const dispatch = useDispatch()
  const {horarios, horario, servicos, components} = useSelector((state) => state.horario)


  const setComponent = (component, state) =>{
    dispatch(
      updateHorario({
        components: {... components, [component]:state},
      })
    )
  }

  const setHorario = (key, value) =>{
    dispatch(updateHorario({
      horario: {...horario, [key]:value},
    }))
  }

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
                <Typography id="modal-modal-title" variant="h4" component="h2" marginBottom={5}>
                    Atualizar horário
                  </Typography>

                <Grid container spacing={3} item>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      disabled={components.disabled}
                      name="horaInicio"
                      label="Horário de início"
                      type="horaInicio"
                      id="horaInicio"
                      autoComplete="horaInicio"
                      value={horario.horaInicio}
                      onChange={(e) => setHorario('horaInicio', e.target.value)}
                    >
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      disabled={components.disabled}
                      name="horaFim"
                      label="Horário de término"
                      type="horaFim"
                      id="horaFim"
                      autoComplete="horaFim"
                      value={moment(horario.horaFim).format('HH:mm')}
                      onChange={(e) => setHorario('horaFim', e.target.value)}
                    >
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                  <Autocomplete
                      multiple
                      id="tags-outlined"
                      value={opcoesDias.filter((e) => {
                        for (let dianum of horario.diaSemana){
                          if (dianum === e.valor) return true
                        }
                      })}
                      options={opcoesDias}
                      getOptionLabel={(option) => option.dia}
                      filterSelectedOptions                    
                      onChange={(event, value) => setHorario('diaSemana' ,value.map((e) => e.valor))}
                      isOptionEqualToValue={(option, value) => option.valor === value.valor}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Dias de atendimento"
                          placeholder="Dia da semana"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={8}><Button variant='contained'>Atualizar</Button></Grid>
                  <Grid item xs={1}><Button variant='contained'>Deletar</Button></Grid>
                </Grid>
              </Box>
            </Modal>
        </div>
      );
    
}

export default Horarios