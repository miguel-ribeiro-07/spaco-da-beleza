const express = require('express')
const router = express.Router()
const Servico = require('../models/servicos')

router.post('/', async(req, res) => {
    try{
        const servico = await new Servico(req.body).save()
        res.json({servico})
    }catch (err){
        res.json({error:true, message:err.message})
    }
})


router.get('/:id', async(req, res) => {
    try{
        const servicos = await Servico.findById(req.params.id)
        res.json({
            serv: [servicos].map((s) =>({label: s.nomeServico, value: s._id}))
        })
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

//LISTAR TODOS OS Servicos
router.get('/', async(req, res) => {
    try{
        const servico = await Servico.find()
        res.json({error:false, servcadastrado:servico})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})


//UPDATE COM ID retornando atualizado
router.put('/:id', async(req, res) =>{
    try{
        await Servico.findByIdAndUpdate(req.params.id, req.body)
        let updServico = await Servico.findById(req.params.id)
        res.json({error:false, updatedclient:updServico})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

//DELETAR POR ID
router.delete('/:id', async(req, res) =>{
    try{
        await Servico.findByIdAndUpdate(req.params.id, {status: 'E'})
        const servico = await Servico.findById(req.params.id)
        res.json({error:false, upd:servico})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

//RECEBE OS FILTROS DE DADOS POR FILTERS
router.post('/filter', async(req, res) =>{
    try{
        const filtServicos = await Servico.find(req.body.filters)
        res.json({error:false, filtServicos})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

module.exports = router