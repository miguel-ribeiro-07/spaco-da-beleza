import produce from 'immer'
import types from './types'
import moment from 'moment'

const INITIAL_STATE = {
    components:{
        sucessSignUp: false,
        confirmDelete: false,
        sucessEdit:false,
        disabled:false
    },
    servicos:[],
    servico:{
        nomeServico:'',
        descricao:'',
        duracao:'',
        preco:'',
        status:'A'
    },
    servicobanco:{
        nomeServico:'',
        descricao:'',
        duracao:moment('00:30', 'HH:mm'). format(),
        preco:'',
        status:''
    }
}

function servico(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_SERVICO: {
            return produce (state, (draft) =>{
                draft = {...draft, ...action.payload}
                return draft
            })
        } case types.RESET_SERVICO: {
            return produce (state, (draft) =>{
                draft.servico = INITIAL_STATE.servico
                return draft
            })
        }  
        default:
            return state
    }
}

export default servico