import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import { updateServico, allServicos as allServicosAction, resetServico } from './actions'
import types from './types'
import api from '../../../services/api'

export function* allServicos(){
    try{
        const {data: res} = yield call(api.get, '/servico/')

        if(res.error){
            alert(res.message)
            return false
        }

        yield put(updateServico({servicos:res.servcadastrado}))
    }catch(err){
        alert(err.message)
    }
}

export function* getServico(){
    const {id} = yield select((state) => state.cliente)

    try{
        const {data: res} = yield call(api.get, `/cliente/${id}`)

        if(res.error){
            alert(res.message)
            return false
        }

        yield put(updateServico({clientebanco:res.clientes}))
    }catch(err){
        alert(err.message)
    }
}

export function* addServico(){
    const {clientecadastro, components} = yield select((state) => state.cliente)

    try{
        const {data: res} = yield call(api.post, '/cliente', {...clientecadastro})

        yield put(updateServico({components:{...components, sucessSignUp:true}}))

        if(res.error){
            alert(res.message)
            return false
        }
    }catch(err){
        alert(err.message)
    }
}

export function* deleteServico(){
    const {id, components} = yield select((state) => state.cliente)

    try{
        const {data: res} = yield call(api.delete, `/cliente/${id}`)

        if(res.error){
            alert(res.message)
            return false
        }
        
        yield put(allServicosAction())
        yield put(updateServico({components: {...components, confirmDelete:false}}))

    }catch(err){
        alert(err.message)
    }
}

export function* updateServicoDB(){
    const {id, components, cliente, clientebanco} = yield select((state) => state.cliente)

    try{
        const {data: res} = yield call(api.put, `/cliente/${id}`, 
        {
            email: cliente.email === '' ? clientebanco.email : cliente.email,
            nome: cliente.nome === '' ? clientebanco.nome : cliente.nome,
            telefone: cliente.telefone === '' ? clientebanco.telefone : cliente.telefone,
            sexo: cliente.sexo === '' ? clientebanco.sexo : cliente.sexo
        })

        if(res.error){
            alert(res.message)
            return false
        }

        yield put(updateServico({components: {...components, sucessEdit:true, disabled:true}}))
        yield put(resetServico())

    }catch(err){
        alert(err.message)
    }
}

export default all([
    takeLatest(types.ALL_SERVICOS, allServicos),
    takeLatest(types.GET_SERVICO, getServico),
    takeLatest(types.ADD_SERVICO, addServico),
    takeLatest(types.DELETE_SERVICO, deleteServico),
    takeLatest(types.UPDATE_SERVICODB, updateServicoDB)
])