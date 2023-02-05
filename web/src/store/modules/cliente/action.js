import types from "./types";

export function allClientes(){
    return {type: types.ALL_CLIENTES}
}

export function updateCliente(payload){
    return {type: types.UPDATE_CLIENTE, payload}
}