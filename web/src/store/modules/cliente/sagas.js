import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import { updateCliente } from './action'
import types from './types'
import api from '../../../services/api'
import consts from '../../../consts'

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

export function* getCliente(){
    try{
        const {data: res} = yield call(api.get, `/cliente/${consts.clienteId}`)

        if(res.error){
            alert(res.message)
            return false
        }

        yield put(updateCliente({clientebanco:res.clientes}))
    }catch(err){
        alert(err.message)
    }
}

export function* addCliente(){
    const {cliente, components} = yield select((state) => state.cliente)

    try{
        const {data: res} = yield call(api.post, '/cliente/', {
            cliente
        })

        yield put(updateCliente({components:{...components, sucessSignUp:true}}))

        if(res.error){
            alert(res.message)
            return false
        }

        yield put(updateCliente({clientes:res.clientes}))
    }catch(err){
        alert(err.message)
    }
}



export default all([
    takeLatest(types.ALL_CLIENTES, allClientes),
    takeLatest(types.GET_CLIENTE, getCliente),
    takeLatest(types.ADD_CLIENTE, addCliente)])