import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import { updateServico, allServicos as allServicosAction} from './actions'
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
    const {id} = yield select((state) => state.servico)

    try{
        const {data: res} = yield call(api.get, `/servico/${id}`)

        if(res.error){
            alert(res.message)
            return false
        }

        yield put(updateServico({servicobanco:res.servico}))
    }catch(err){
        alert(err.message)
    }
}

export function* addServico(){
    const {servico, components} = yield select((state) => state.servico)

    try{
        const {data: res} = yield call(api.post, '/servico', {...servico})

        yield put(updateServico({components:{...components, sucessAdd:true, disabled:true}}))

        if(res.error){
            alert(res.message)
            return false
        }
    }catch(err){
        alert(err.message)
    }
}

export function* deleteServico(){
    const {id, components} = yield select((state) => state.servico)

    try{
        const {data: res} = yield call(api.delete, `/servico/${id}`)

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
    const {id, components, servico, servicobanco} = yield select((state) => state.servico)

    try{
        const {data: res} = yield call(api.put, `/servico/${id}`, 
        {
            nomeServico: servico.nomeServico === '' ? servicobanco.nomeServico : servico.nomeServico,
            descricao: servico.descricao === '' ? servicobanco.descricao : servico.descricao,
            duracao: servico.duracao === '' ? servicobanco.duracao : servico.duracao,
            preco: servico.preco === '' ? servicobanco.preco : servico.preco,
            status: servico.status === '' ? servicobanco.status : servico.status,
        })

        if(res.error){
            alert(res.message)
            return false
        }

        yield put(updateServico({components: {...components, sucessEdit:true, disabled:true}}))

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