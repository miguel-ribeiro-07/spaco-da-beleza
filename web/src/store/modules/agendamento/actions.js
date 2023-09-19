import types from "./types"

export function filterAgendamentos(start, end){
    return{
        type:types.FILTER_AGENDAMENTOS,
        start,
        end
    }
}

export function updateAgendamento(agendamentos){
    return {type: types.UPDATE_AGENDAMENTO, agendamentos}
}

export function getAgendamento(payload){
    return {type: types.GET_AGENDAMENTO, payload}
}

export function deleteAgendamento(){
    return {type: types.DELETE_AGENDAMENTO}
}