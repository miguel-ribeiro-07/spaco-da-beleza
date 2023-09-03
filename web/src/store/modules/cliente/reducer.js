import produce from 'immer'
import types from './types'

const INITIAL_STATE = {
    components:{
        sucessSignUp: false,
        confirmDelete: false,
        sucessEdit:false,
        notLogin:false,
        disabled:false
    },
    clientes:[],
    cliente:{
        email:'',
        nome:'',
        telefone:'',
        sexo:'',
    },
    clientecadastro:{
        email:'',
        nome:'',
        telefone:'',
        sexo:'',
        senha:''
    },
    clientelogin:{
        email:'',
        senha:'',
        found: null
    },
    clientebanco:{
        email:'',
        nome:'',
        telefone:'',
        sexo:'',
    },
    id:[]
}

function cliente(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_CLIENTE: {
            return produce (state, (draft) =>{
                draft = {...draft, ...action.payload}
                return draft
            })
        } case types.RESET_CLIENTE: {
            return produce (state, (draft) =>{
                draft.cliente = INITIAL_STATE.cliente
                return draft
            })
        }  
        default:
            return state
    }
}

export default cliente