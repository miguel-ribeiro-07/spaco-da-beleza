import types from "./types";

export function allServicos(){
    return {type: types.ALL_SERVICOS}
}

export function updateServicos(servicos){
    return {type: types.UPDATE_SERVICOS, servicos}
}

export function updateAgendamento(agendamento){
    return {type: types.UPDATE_AGENDAMENTO, agendamento}
}

export function updateAgenda(agenda){
    return {type: types.UPDATE_AGENDA, agenda}
}
