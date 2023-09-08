import { combineReducers } from "redux";

import agendamento from './modules/agendamento/reducer'
import cliente from './modules/cliente/reducer'
import servico from './modules/servico/reducer'
import horario from './modules/horario/reducer'
import agenda from './modules/agenda/reducer'

export default combineReducers({
    agendamento,
    cliente,
    servico,
    horario,
    agenda
})