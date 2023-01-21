const express = require('express')
const router = express.Router()
const Busboy = require('busboy')
const aws = require('../services/aws')

router.post('/', async(req, res) => {
    let busboy =  new Busboy({headers: req.header})
    busboy.on('finish', async ()  =>{
        try{
            let errors = []
            let arquivos = []

            // REQUISITANDO O ARQUIVO/IMAGEM DO SERVIÇO PARA O AWS
            if(req.files && Object.keys(req.files) > 0){
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
            }

            if(errors.length > 0){
                req.json(errors[0])
                return false
            }

            //CRIAR SERVIÇO

            
            //CRIAR ARQUIVO
        }catch (err){
            res.json({error:true, message:err.message})
        }
    })
    req.pipe(busboy)
})

module.exports = router