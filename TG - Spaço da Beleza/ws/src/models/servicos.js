const mongoose = require('mongoose');
const Schema = mongoose.Schema

const servicos = new Schema({
    nomeServico:{
        type:String,
        require:[true, 'O nome do serviço é obrigatório']
    },
    descricao:String,
    duracao:{
        type:String, // duração em minutos
        require:[true, 'A duração do serviço é obrigatória']
    },
    preco:{
        type:Number,
        require:[true, 'O preço do serviço é obrigatório']
    },
    foto:String,
    status:{
        type:String,
        enum:['A', 'I', 'E'],// Status de excluído "E" para a não remoção do db
        require:true
    },
    dataCadastro:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Servicos', servicos)