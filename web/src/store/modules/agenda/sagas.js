import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import types from './types'
import api from '../../../services/api'
import { updateServicos, updateAgendamento, updateAgenda } from './actions'
import moment from 'moment'

export function* allServicos(){
    try{
        const {data: res} = yield call(api.get, '/servico/')

        if(res.error){
            alert(res.message)
            return false
        }

        yield put(updateServicos({servicos:res.servcadastrado}))
    }catch(err){
        alert(err.message)
    }
}

export function* filterAgenda(){
    const {agendamento} = yield select(state => state.agenda)
    try{
        const {data: res} = yield call(api.post, '/agendamento/dias-disponiveis', {
            ...agendamento,
            data: moment().format('YYYY-MM-DD')
        })

        console.log(res)

        yield put(updateAgenda(res.agenda))

        if(res.error){
            alert(res.message)
            return false
        }
    }catch(err){
        alert(err.message)
    }
}

export default all([
    takeLatest(types.ALL_SERVICOS, allServicos),
    takeLatest(types.FILTER_AGENDA, filterAgenda)
])