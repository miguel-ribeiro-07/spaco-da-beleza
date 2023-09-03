import types from "./types";

export function allClientes(){
    return {type: types.ALL_CLIENTES}
}

export function updateCliente(payload){
    return {type: types.UPDATE_CLIENTE, payload}
}

export function getCliente(){
    return{type: types.GET_CLIENTE}
}

export function addCliente(){
    return{type: types.ADD_CLIENTE}
}

export function deleteCliente(){
    return{type: types.DELETE_CLIENTE}
}

export function updateClienteDB(){
    return{type: types.UPDATE_CLIENTEDB}
}

export function resetCliente(){
    return{type: types.RESET_CLIENTE}
}

export function filterCliente(){
    return{type: types.FILTER_CLIENTE}
}