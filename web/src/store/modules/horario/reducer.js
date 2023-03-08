import produce from 'immer'
import types from './types'

const INITIAL_STATE = {
    components:{
        confirmDelete: false,
        sucessAdd: false,
        sucessEdit:false,
        modal:false,
        view: 'week',
        disabled:false
    },
    servicos:[],
    horarios:[],
    horario:{
        diaSemana:[],
        horaInicio:'',
        horaFim:'',
        servicosId:[]
    },
}

function horario(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_HORARIO: {
            return produce (state, (draft) =>{
                draft = {...draft, ...action.payload}
                return draft
            })
        } case types.RESET_HORARIO: {
            return produce (state, (draft) =>{
                draft.horario = INITIAL_STATE.horario
                return draft
            })
        }  
        default:
            return state
    }
}

export default horario