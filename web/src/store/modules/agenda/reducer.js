import produce from 'immer'
import types from './types'

const INITIAL_STATE = {
    servicos:[],
    servico:{},
    fullagenda:[],
    agendamento:{
        clienteId: null,
        servicoId: null,
        dataHora: null
    },
    form:{
        successMessage:false,
        modal:false,
        disabled:false,
        error:false
    }

}

function agenda(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_SERVICOS: {
            return produce (state, (draft) =>{
                draft.servicos = action.servicos.servicos
                return draft
            })
        }
        case types.UPDATE_AGENDA:{
            return produce(state, (draft) =>{
                draft.fullagenda = action.agenda;
            })
        }
        case types.UPDATE_AGENDAMENTO: {
            return produce (state, (draft) =>{
                draft = {...draft, ...action.agendamento}
                return draft
            })
        }
        default:
            return state
    }
}

export default agenda