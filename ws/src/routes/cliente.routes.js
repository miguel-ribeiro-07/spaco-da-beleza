const express = require('express')
const router = express.Router()
const Cliente  = require('../models/cliente')

//CRIAR UM CLIENTE
router.post('/', async(req, res) => {
    try{
        const cliente = await new Cliente(req.body).save()
        res.json({cliente})
    }catch (err){
        res.json({error:true, message:err.message})
    }
})

//BUSCA POR ID
router.get('/:id', async(req, res) => {
    try{
        const clientes = await Cliente.findById(req.params.id)
        res.json({clientes})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

//LISTAR TODOS OS CLIENTES
router.get('/', async(req, res) => {
    try{
        const clientes = await Cliente.find()
        res.json({error:false, clientes:clientes})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

//UPDATE COM ID retornando atualizado
router.put('/:id', async(req, res) =>{
    try{
        await Cliente.findByIdAndUpdate(req.params.id, req.body)
        let upClientes = await Cliente.findById(req.params.id)
        res.json({error:false, upd:upClientes})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

//DELETAR POR ID
router.delete('/:id', async(req, res) =>{
    try{
        await Cliente.findByIdAndDelete(req.params.id)
        res.json({error:false})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

//RECEBE OS FILTROS DE DADOS POR FILTERS
router.post('/filter', async(req, res) =>{
    try{
        const filtCliente = await Cliente.find(req.body)
        res.json({error:false, filtCliente})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

module.exports = router