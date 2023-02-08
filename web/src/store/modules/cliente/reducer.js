import produce from 'immer'
import types from './types'

const INITIAL_STATE = {
    components:{
        sucessSignUp: false,
        confirmDelete: false
    },
    clientes:[],
    cliente:{
        email:'',
        nome:'',
        telefone:'',
        sexo:'',
    },
    clientebanco:{
        email:'',
        nome:'',
        telefone:'',
        sexo:'',
    }
}

function cliente(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_CLIENTE: {
            return produce (state, (draft) =>{
                draft = {...draft, ...action.payload}
                return draft
            })
        }   
        default:
            return state
    }
}

export default cliente