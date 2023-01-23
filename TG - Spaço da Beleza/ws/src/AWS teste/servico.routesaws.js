const express = require('express')
const router = express.Router()
const Busboy = require('busboy')
const Servico = require('../models/servicos')
const Arquivo = require('../models/arquivo')
const aws = require('../services/aws')

//ROTA RECEBIMENTO FORMDATA
router.post('/', async(req, res) => {
    let busboy = Busboy({headers: req.headers});
    busboy.on('finish', async ()  =>{
        try{
            const {servico} = req.body
            let errors = []
            let arquivos = []


            console.log(req.files);
            // REQUISITANDO O ARQUIVO/IMAGEM DO SERVIÇO PARA O AWS
            /*if(req.files && Object.keys(req.files).length > 0){
                for(let key of Object.keys(req.files)){
                    const file = req.files[key]
                }
                const nameParts = file.name.split('.');
                const fileName = `${new Date().getTime()}.${nameParts[this.name.length - 1]}`
                const path = `servicos/${fileName}`

                const response = await aws.uploadToS3()

                if (response.error){
                    errors.push({error:true, message: response.message})
                }else{
                    arquivos.push(path)
                }
            }*/

            if(errors.length > 0){
                req.json(errors[0])
                return false
            }

            //CRIAR SERVIÇO
            let jsonServico = JSON.parse(servico)
            const servicoCadastrado = await new Servico(jsonServico).save()
            
            //CRIAR ARQUIVO
            arquivos = arquivos.map(arquivo => ({
                referenciaId: servicoCadastrado.id,
                model:'Servico',
                caminho:arquivo
            }))

            await Arquivo.insertMany(arquivos)

            res.json({servico:servicoCadastrado, arquivos})
        }catch (err){
            res.json({error:true, message:err.message})
        }
    })
    req.pipe(busboy)
})

module.exports = router