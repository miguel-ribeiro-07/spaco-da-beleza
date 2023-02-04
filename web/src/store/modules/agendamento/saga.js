import {all, takeLatest, call, put} from 'redux-saga/effects'
import api from '../../../services/api'
import { updateAgendamento } from './actions'
import types from './types'

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
        console.log(res)

         yield put(updateAgendamento(res.agendamentos))
    }catch(err){
        alert(err.message)
    }
}

export default all([takeLatest(types.FILTER_AGENDAMENTOS, filterAgendamento)])