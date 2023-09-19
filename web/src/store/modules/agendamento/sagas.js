import {all, takeLatest, call, put, select} from 'redux-saga/effects'
import api from '../../../services/api'
import { updateAgendamento, getAgendamento, filterAgendamentos } from './actions'
import types from './types'
import moment from 'moment'

export function* filterAgendamento({start, end}) {
    try{
        const {data:res} = yield call(api.post,'/agendamento/filter', {
            periodo:{
                inicio:start,
                final:end
            }
        })

        if (res.error){
            alert(res.message)
            return false
        }
         yield put(updateAgendamento(res.agendamentos))
    }catch(err){
        alert(err.message)
    }
}

export function* deleteAgendamento(){
    const {agendamento, components} = yield select((state) => state.agendamento)

    try{
        const {data: res} = yield call(api.delete, `/agendamento/${agendamento._id}`)

        if(res.error){
            alert(res.message)
            return false
        }
        
        yield put(getAgendamento({components: {...components, confirmDelete:false, modal:false}}))
        yield put(filterAgendamentos(moment().weekday(0).format('YYYY-MM-DD'),moment().weekday(6).format('YYYY-MM-DD')))

    }catch(err){
        alert(err.message)
    }
}

export default all([
    takeLatest(types.FILTER_AGENDAMENTOS, filterAgendamento),
    takeLatest(types.DELETE_AGENDAMENTO, deleteAgendamento)
])