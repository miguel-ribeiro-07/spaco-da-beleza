import types from "./types";

export function allServicos(){
    return {type: types.ALL_SERVICOS}
}

export function updateServico(payload){
    return {type: types.UPDATE_SERVICO, payload}
}

export function getServico(){
    return{type: types.GET_SERVICO}
}

export function addServico(){
    return{type: types.ADD_SERVICO}
}

export function deleteServico(){
    return{type: types.DELETE_SERVICO}
}

export function updateServicoDB(){
    return{type: types.UPDATE_SERVICODB}
}

export function resetServico(){
    return{type: types.RESET_SERVICO}
}