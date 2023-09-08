import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import types from './types'
import api from '../../../services/api'
import { updateServicos } from './actions'

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


export default all([
    takeLatest(types.ALL_SERVICOS, allServicos),
])