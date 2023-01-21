const mongoose = require('mongoose')
const Schema = mongoose.Schema

const agendamento = new Schema({
    clienteId:{
        type:mongoose.Types.ObjectId,
        ref:'Cliente',
        require:true
    },
    sevicoId:{
        type:mongoose.Types.ObjectId,
        ref:'Servico',
        require:true
    },
    dataHora:{
        type:Date,
        require:true
    },
    foto:{
        type:String,
        require:true
    },
    dataCadastro:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Agendamento', agendamento)