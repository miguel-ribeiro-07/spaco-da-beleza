const express = require('express')
const router = express.Router()
const moment = require('moment')
const _ = require('chunk')
const Agendamento = require('../models/agendamento')
const Servico = require('../models/servicos')
const Horario = require('../models/horarios')
const ferramentas = require('../services/ferramentas')

//CADASTRAR AGENDAMENTO
router.post('/', async(req, res) => {
    try{
        const agendamento = await new Agendamento(req.body).save()
        res.json({agendamento})
    }catch (err){
        res.json({error:true, message:err.message})
    }
})

router.post('/filter', async(req, res) =>{
    try{
        const {periodo} = req.body

        const agendamentos = await Agendamento.find({
            dataHora:{
                $gte:moment(periodo.inicio).startOf('day'),
                $lte:moment(periodo.final).endOf('day')
            }
        }).populate([
            {path:'servicoId', select:'nomeServico duracao'},
            {path:'clienteId', select:'nome'}
        ])
        
        res.json({error:false, agendamentos:agendamentos})
    }catch(err){
        res.json({error:true, message:err.message})
    }})

//CONSULTA DE DIAS DISPONIVEIS
router.post('/dias-disponiveis', async(req, res) =>{
    try{
        //PEGA AS REQUISIÇÕES DO USUÁRIO
        const {dataHora, servicoId} = req.body

        //LOCALIZA O SERVIÇO, A DURAÇÃO DO SERVIÇO E OS HORÁRIOS DISPONIVEIS PARA ELE
        const horarios = await Horario.find({servicoId})
        const servicoDados = await Servico.findById(servicoId).select('duracao preco nomeServico')

        let agenda = []
        let lastDay = moment(dataHora)


        //CONVERSOR DA DURAÇÃO DO SERVIÇO EM MINUTOS
        const servicoMinutos = ferramentas.hourToMinutes(moment(servicoDados.duracao).format("HH:mm"))

        const servicoSlots = ferramentas.sliceMinutes(
            servicoDados.duracao,
            moment(servicoDados.duracao).add(servicoMinutos, 'minutes',),
            ferramentas.SLOT_DURATION
        ).length


        /*VERIFICAR 7 DIAS DISPONÍVEIS NA AGENDA*/
        for (let i = 0; i <= 365 && agenda.length <= 7; i++){
            const espacosValidos = horarios.filter((horario) =>{
                const diaSemanaDisponivel = horario.diaSemana.includes(moment(lastDay).day()) // 0 domingo a 6 sábado
                const servicoDisponivel = horario.servicosId.includes(servicoId)
                return diaSemanaDisponivel && servicoDisponivel
            })

            const teste = horarios.filter((horario) =>{
                const ss = horario.servicosId.includes(servicoId)
            
                return ss
            })
            

            if(espacosValidos.length > 0){
                let todosHorariosDia = {}

                //COLOCA OS HORÁRIOS DENTRO DOS SERVIÇOS RESPECTIVOS
                for(let spaco of espacosValidos){
                    
                        if(!todosHorariosDia[servicoId]){
                            todosHorariosDia[servicoId] = []
                        }
                        todosHorariosDia[servicoId] = [
                            ...todosHorariosDia[servicoId],
                            ...ferramentas.sliceMinutes(
                            ferramentas.mergeDateTime(lastDay, spaco.horaInicio),
                            ferramentas.mergeDateTime(lastDay, spaco.horaFim),
                            ferramentas.SLOT_DURATION 
                        )]
                }


                //RECEBE TODOS AGENDAMENTOS DO DIA SELECIONADO
                for (let servicoId of Object.keys(todosHorariosDia)){
                    const agendamentos = await Agendamento.find({
                        dataHora:{
                            $gte:moment(lastDay).startOf('day'),
                            $lte:moment(lastDay).endOf('day')
                        }
                    }).select('dataHora servicoId').populate('servicoId', 'duracao')


                    //RECEBE QUAIS HORÁRIOS JÁ ESTÃO AGENDADOS NO DIA SELECIONADO
                    let horariosOcupados = agendamentos.map((agendamento) => ({
                        inicio:moment(agendamento.dataHora),
                        final: moment(agendamento.dataHora).add(
                            ferramentas.hourToMinutes(
                                moment(agendamento.servicoId.duracao).format('HH:mm')
                            ), 'minutes'
                        )
                    }))
                    
                    //RECECUPERAR TODOS OS SLOTS ENTRE AGENDAMENTOS
                    horariosOcupados = horariosOcupados.map(horario => ferramentas.sliceMinutes(horario.inicio, horario.final, ferramentas.SLOT_DURATION)).flat()

                    //REMOVENDO OS HORÁRIOS JÁ AGENDADOS
                    let horariosLivres = ferramentas.splitByValue(todosHorariosDia[servicoId].map(
                        (horarioLivre) =>{
                            return horariosOcupados.includes(horarioLivre) 
                            ? '-'
                            : horarioLivre
                        }),'-'
                    )
                //VERIFICANDO SE EXISTE ESPAÇO SUFICIENTE NO SLOT
                horariosLivres = horariosLivres.filter((horarios) => horarios.length >= servicoSlots)

                //VERIFICANDO SE OS HORÁRIOS DENTRO DO SLOT TEM A CONTINUIDADE (EM HORAS) NECESSÁRIAS
                horariosLivres = horariosLivres.map((slot) => slot.filter((horario, index) => slot.length - index >= servicoSlots)).flat()

                //FORMATAÇÃO PARA 2 EM 2
                //horariosLivres = _.chunk(horariosLivres, 2)
                
                //REMOVER O SERVIÇO DO DIA CASO NÃO POSSUA HORÁRIOS
                if(horariosLivres.length === 0){
                    todosHorariosDia = _.omit(todosHorariosDia, servicoId)
                }

                //DEFINE SE NO ARRAY IRÁ TRAZER O ID OU NÃO DOS SERVIÇOS
                todosHorariosDia = horariosLivres

                //VERIFICA SE O SERVIÇO ESTÁ DISPONÍVEL NAQUELE DIA
                const totalServicos = Object.keys(todosHorariosDia).length

                if (totalServicos > 0){
                    agenda.push({[lastDay.format('YYYY-MM-DD')]:todosHorariosDia})
                }
                }
            }
            lastDay = lastDay.add(1, 'day')
        }

        res.json({error:false, servico:servicoDados.nomeServico, tempo:ferramentas.toHourandMinutes(servicoMinutos) , preco:servicoDados.preco, agenda})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

module.exports = router