import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import { updateCliente, allClientes as allClientesAction, resetCliente } from './actions'
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

export function* getCliente(){
    const {id} = yield select((state) => state.cliente)

    try{
        const {data: res} = yield call(api.get, `/cliente/${id}`)

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
    const {clientecadastro, components} = yield select((state) => state.cliente)

    try{
        const {data: res} = yield call(api.post, '/cliente', {...clientecadastro})

        yield put(updateCliente({components:{...components, sucessSignUp:true}}))

        if(res.error){
            alert(res.message)
            return false
        }
    }catch(err){
        alert(err.message)
    }
}

export function* deleteCliente(){
    const {id, components} = yield select((state) => state.cliente)

    try{
        const {data: res} = yield call(api.delete, `/cliente/${id}`)

        if(res.error){
            alert(res.message)
            return false
        }
        
        yield put(allClientesAction())
        yield put(updateCliente({components: {...components, confirmDelete:false}}))

    }catch(err){
        alert(err.message)
    }
}

export function* updateClienteDB(){
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

        yield put(resetCliente())
        yield put(updateCliente({components: {...components, sucessEdit:true, disabled:true}}))

    }catch(err){
        alert(err.message)
    }
}

export function* filterCliente() {
    const {clientelogin} = yield select((state) => state.cliente)

    try{
        const {data:res} = yield call(api.post,'/cliente/filter', 
        {
            email: clientelogin.email,
            senha: clientelogin.senha
        })

        if (res.error){
            alert(res.message)
            return false
        }

         if(res.localizado === true){
            localStorage.setItem('@userId', res.id)
            
         }

         yield put(updateCliente({clientelogin:{...clientelogin, found:res.localizado}}))
    }catch(err){
        alert(err.message)
    }
}

export default all([
    takeLatest(types.ALL_CLIENTES, allClientes),
    takeLatest(types.GET_CLIENTE, getCliente),
    takeLatest(types.ADD_CLIENTE, addCliente),
    takeLatest(types.DELETE_CLIENTE, deleteCliente),
    takeLatest(types.UPDATE_CLIENTEDB, updateClienteDB),
    takeLatest(types.FILTER_CLIENTE, filterCliente)
])