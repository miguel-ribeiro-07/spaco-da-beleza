// eslint-disable-next-line
export default {
    diasSemana: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    hourToMinutes: (time) =>{
        const [hour, minutes] = time.split(':')
        return parseInt(parseInt(hour) * 60 + parseInt(minutes))
    },

    selectAgendamento: (agenda, data = null) =>{
        let horariosDisponiveis = []

        if (agenda.length > 0){
            data = data || Object.keys(agenda?.[0])?.[0]
            const dia = agenda.filter((e) => Object.keys(e)[0] === data)?.[0]
            const diaObject = dia?.[data]
            horariosDisponiveis = diaObject
        }
        
        return {horariosDisponiveis, data}
    }
}