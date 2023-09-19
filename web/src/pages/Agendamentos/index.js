import { useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {useDispatch, useSelector} from 'react-redux'
import { filterAgendamentos, getAgendamento, deleteAgendamento } from '../../store/modules/agendamento/actions'
import ferramentas from '../../ferramentas'
import { Modal } from '@mui/material'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const localizer = momentLocalizer(moment)


const Agendamentos = () =>{

    const dispatch = useDispatch()
    const {agendamentos, agendamento, components} = useSelector((state) => state.agendamento)

    const style = {
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

      const setComponent = (component, state) =>{
        dispatch(
          getAgendamento({
            components: {... components, [component]:state},
          })
        )
      }


    const formatEventos = agendamentos.map((agendamento) => ({
        resource: agendamento,
        title:`${agendamento.servicoId.nomeServico} - ${agendamento.clienteId.nome}`,
        start:moment(agendamento.dataHora).toDate(),
        end:moment(agendamento.dataHora).add(ferramentas.hourToMinutes(moment(agendamento.servicoId.duracao).format('HH:mm')), 'minutes').toDate()
    }))

    const formatRange = (periodo) => {
        let finalRange = {}
        if (Array.isArray(periodo)){
            finalRange = {
                start: moment(periodo[0]).format('YYYY-MM-DD'),
                end: moment(periodo[periodo.length - 1]).format('YYYY-MM-DD')
            }
        }else{
            finalRange = {
                start: moment(periodo.start).format('YYYY-MM-DD'),
                end: moment(periodo.end).format('YYYY-MM-DD')
            }
        }
        return finalRange
    }

    useEffect(() =>{
        dispatch(filterAgendamentos(
        moment().weekday(0).format('YYYY-MM-DD'),
        moment().weekday(6).format('YYYY-MM-DD')))
        // eslint-disable-next-line
    }, [])

    console.log(agendamento)

    return (
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-4">Agendamentos</h1>
                    <Calendar
                        onSelectEvent={(e) => {
                            dispatch(getAgendamento({
                            agendamento: e.resource
                            }))
                            setComponent('modal', true);
                        }}
                        localizer={localizer}
                        onRangeChange={(periodo) =>{
                        const {start, end} = formatRange(periodo)
                        dispatch(filterAgendamentos(start, end)
                        )
                        }}
                        events={formatEventos}
                        defaultView="week"
                        selectable
                        popup
                        style={{ height: 600 }}
                    />
                    <Modal
                        open={components.modal}
                        onClose={() => setComponent('modal', false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <IconButton  sx={{marginLeft:43, marginBottom:2}} size="large" onClick={() =>{setComponent('modal', false)}}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                            <Typography variant='h4'>Dados do agendamento</Typography>
                            <Typography variant='h5'marginTop={3} >Nome do cliente: {agendamento.clienteId.nome}</Typography>
                            <Typography variant='h5'marginTop={2} >Tipo de serviço: {agendamento.servicoId.nomeServico}</Typography>
                            <Typography variant='h5'marginTop={2} >Data e hora: {moment(agendamento.dataHora).format('DD/MM - HH:mm')}</Typography>
                            <Button variant='contained' onClick={() =>{setComponent('confirmDelete', true)}} sx={{marginTop:5, marginLeft:32, backgroundColor:'#8936b3'}}>Deletar</Button>
                            <Dialog
                                open={components.confirmDelete}
                                onClose={() => setComponent('confirmDelete', false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                >
                                <DialogTitle id="alert-dialog-title">
                                    {"Exclusão de agendamento"}
                                </DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Realmente gostaria de realizar a exclusão deste agendamento?
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button variant='contained' onClick={() => {dispatch(deleteAgendamento())}}>Deletar</Button>
                                    <Button variant='contained' onClick={() => setComponent('confirmDelete', false)} autoFocus>
                                        Não deletar
                                    </Button>
                                    </DialogActions>
                            </Dialog>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    )
    
}

export default Agendamentos