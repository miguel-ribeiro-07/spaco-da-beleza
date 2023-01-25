const express = require('express')
const router = express.Router()
const moment = require('moment')
const Agendamento = require('../models/agendamento')


router.post('/', async(req, res) => {
    try{
        const agendamento = await new Agendamento(req.body).save()
        res.json({agendamento})
    }catch (err){
        res.json({error:true, message:err.message})
    }
})

//BUSCA POR ID
router.get('/:id', async(req, res) => {
    try{
        const agendamento = await Agendamento.findById(req.params.id)
        res.json({agendamento})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

module.exports = router