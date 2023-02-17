const express = require('express')
const router = express.Router()
const Horario = require('../models/horarios')

//CRIAÇÃO DE UM NOVO HORÁRIO
router.post('/', async(req, res) => {
    try{
        const horario = await new Horario(req.body).save()
        res.json({horario})
    }catch (err){
        res.json({error:true, message:err.message})
    }
})

//BUSCA POR ID
router.get('/:id', async(req, res) => {
    try{
        const horario = await Horario.findById(req.params.id).populate({path:'servicoId', select:'-dataCadastro'})
        res.json({horario})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

//LISTAR TODOS OS horarios
router.get('/', async(req, res) => {
    try{
        const horarios = await Horario.find()
        res.json({error:false, horarios:horarios})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

//UPDATE COM ID retornando atualizado
router.put('/:id', async(req, res) =>{
    try{
        await Horario.findByIdAndUpdate(req.params.id, req.body)
        let uphorarios = await Horario.findById(req.params.id)
        res.json({error:false, upd:uphorarios})
    }catch(err){
        res.json({error:true, message:err.message})
    }

})

//DELETAR POR ID
router.delete('/:id', async(req, res) =>{
    try{
        await Horario.findByIdAndDelete(req.params.id)
        res.json({error:false})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

//RECEBE OS FILTROS DE DADOS POR FILTERS
router.post('/filter', async(req, res) =>{
    try{
        const filtHorario = await Horario.find(req.body.filters)
        res.json({error:false, filtHorario})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})
module.exports = router