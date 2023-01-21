const express = require('express')
const router = express.Router()
const Cliente  = require('../models/cliente')

router.post('/', async(req, res) => {
    try{
        const cliente = await new Cliente(req.body).save()
        res.json({cliente})
    }catch (err){
        res.json({error:true, message:err.message})
    }
})

router.get('/clientes/:clientesId', async(req, res) => {
    try{
        const {clientesId} = req.params
        const clientes = await Cliente.find({
            clientesId,
            status: 'A'
        })
        res.json({clientes})
    }catch (err){
        res.json({error:true, message:err.message})
    }
})

module.exports = router