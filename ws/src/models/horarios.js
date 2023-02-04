const mongoose = require('mongoose');
const Schema = mongoose.Schema

const horarios = new Schema ({
    servicoId:[{ // Vários ID's de serviços dentro de um array
        type: mongoose.Types.ObjectId,
        ref:'Servicos',
        require:true
    }],
    diaSemana:{
        type:[Number], // Array apenas de números
        require:true
    },
    horaInicio:{
        type:Date,
        require:true
    },
    horaFim:{
        type:Date,
        require:true
    },
    dataCadastro:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Horarios', horarios)