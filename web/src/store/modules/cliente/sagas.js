import {takeLatest, all, call, put} from 'redux-saga/effects'
import { updateCliente } from './action'
import types from './types'
import api from '../../../services/api'

export function* allClientes(){
    try{
        const {data: res} = yield call(api.get, '/cliente/')

        if(res.error){
            alert(res.message)
            return false
        }

        yield put(updateCliente({clientes:res.clientes}))
    }catch(err){
        alert(err.message)
    }
}

export default all([takeLatest(types.ALL_CLIENTES, allClientes)])