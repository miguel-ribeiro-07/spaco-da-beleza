import { useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {useDispatch, useSelector} from 'react-redux'
import { filterAgendamentos } from '../../store/modules/agendamento/actions'
import ferramentas from '../../ferramentas'

const localizer = momentLocalizer(moment)


const Agendamentos = () =>{

    const dispatch = useDispatch()
    const {agendamentos} = useSelector((state) => state.agendamento)

    const formatEventos = agendamentos.map((agendamento) => ({
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

    return (
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-4">Agendamentos</h1>
                    <Calendar
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
                </div>
            </div>
        </div>
    )
    
}

export default Agendamentos