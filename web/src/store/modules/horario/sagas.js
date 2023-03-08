import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import { updateHorario, allHorarios as allHorariosAction, resetHorario } from './actions'
import types from './types'
import api from '../../../services/api'

export function* allHorarios(){
    try{
        const {data: res} = yield call(api.get, '/horario/')

        if(res.error){
            alert(res.message)
            return false
        }

        yield put(updateHorario({horarios:res.horarios}))
    }catch(err){
        alert(err.message)
    }
}

export function* allServicos(){
    try{
        const {data: res} = yield call(api.get, '/servico/')

        if(res.error){
            alert(res.message)
            return false
        }

        yield put(updateHorario({servicos:res.servcadastrado}))
    }catch(err){
        alert(err.message)
    }
}


export function* addHorario(){
    const {horario, components} = yield select((state) => state.horario)

    try{
        const {data: res} = yield call(api.post, '/horario', {...horario})
        console.log(res)

        yield put(updateHorario({components:{...components, disabled:true}}))

        if(res.error){
            alert(res.message)
            return false
        }
    }catch(err){
        alert(err.message)
    }
}

export function* removeHorario(){
    const {id, components} = yield select((state) => state.cliente)

    try{
        const {data: res} = yield call(api.delete, `/cliente/${id}`)

        if(res.error){
            alert(res.message)
            return false
        }
        
        yield put(allHorariosAction())
        yield put(updateHorario({components: {...components, confirmDelete:false}}))

    }catch(err){
        alert(err.message)
    }
}


export default all([
    takeLatest(types.ALL_HORARIOS, allHorarios),
    takeLatest(types.ALL_SERVICOS, allServicos)
])