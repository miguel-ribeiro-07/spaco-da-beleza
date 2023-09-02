import produce from 'immer'
import types from './types'
import consts from '../../../consts'

const INITIAL_STATE = {
    servicos:[],
    agenda:[],
    agendamento:{
        clienteId: consts.clienteId,
        servicoId: null,
        data: null
    },
    form:{
        inputFiltro: '',
        inputFiltroFoco: ''
    }

}

function salao(state = INITIAL_STATE, action){
    switch(action.type){
        default:
            return state
    }
}

export default salao