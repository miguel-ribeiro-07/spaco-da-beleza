const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cliente = new Schema({
    nome: {
        type:String,
        require: [true, 'O nome é obrigatório']
    },
    email:{
        type:String,
        require: [true, 'O e-mail é obrigatório']
    },
    telefone:String,
    dataNascimento:Date,
    senha:{
        type:String,
        require: [true, 'A data de nascimento é obrigatório']
    },
    sexo:{
        type:String,
        enum:['Feminino', 'Masculino'],
        require: [true, 'O sexo é obrigatório']
    },
    status:{
        type:String,
        enum:['A', 'I'],
        require:true
    },
    dataCadastro:{
        type:Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Cliente', cliente)