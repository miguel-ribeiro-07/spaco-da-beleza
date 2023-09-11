import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import types from './types'
import api from '../../../services/api'
import { updateServicos, updateAgenda, updateAgendamento } from './actions'
import ferramentas from '../../../ferramentas'
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
    const {agendamento, form} = yield select(state => state.agenda)
    try{
        const {data: res} = yield call(api.post, '/agendamento/dias-disponiveis', {
            ...agendamento,
            data: moment().format('YYYY-MM-DD')
        })

        yield put(updateAgenda(res.agenda))
        yield put(updateAgendamento({form:{...form, error:false}}))

        const {horariosDisponiveis, data} = yield call(ferramentas.selectAgendamento, res.agenda)
        if (data === null) {
            yield put(updateAgendamento({form:{...form, error:true}}))
        }else{ 
            yield put(updateAgendamento({agendamento:{...agendamento, data:moment(`${data}T${horariosDisponiveis[0]}`).format()}}))
        }

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