import produce from 'immer'
import types from './types'
import moment from 'moment'

const INITIAL_STATE = {
    servicos:null,
    servico:{},
    agenda:[],
    agendamento:{
        clienteId: null,
        servicoId: null,
        data: null
    },
    form:{
        successMessage:false,
        modal:false,
        disabled:false
    }

}

function agenda(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_SERVICOS: {
            return produce (state, (draft) =>{
                draft.servicos = action.servicos
                return draft
            })
        }
        case types.UPDATE_AGENDA:{
            return produce(state, (draft) =>{
                draft.agenda = [...state.agenda, action.agenda]
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