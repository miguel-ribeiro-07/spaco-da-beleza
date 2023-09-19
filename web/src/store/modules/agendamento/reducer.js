import types from './types'
import produce from "immer"
const INITIAL_STATE = {
    agendamentos:[],
    agendamento:{
        clienteId:'',
        dataHora:'',
        servicoId:''
    },
    components:{
        modal:false,
        confirmDelete:false
    }
}

function agendamento(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_AGENDAMENTO:{
            return produce(state, (draft)=>{
                draft.agendamentos = action.agendamentos
                return draft
            })
        } case types.GET_AGENDAMENTO: {
            return produce(state, (draft) =>{
                draft = {...draft, ...action.payload}
                return draft
            })
        }
        default:
        return state;
    }

}

export default agendamento