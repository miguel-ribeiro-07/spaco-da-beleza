const moment = require('moment')

module.exports = {
    SLOT_DURATION:30,
    hourToMinutes: (time) =>{
        const [hour, minutes] = time.split(':')
        return parseInt(parseInt(hour) * 60 + parseInt(minutes))
    },
    sliceMinutes: (start, end, duration) => {
        const slices = []
        let count = 0

        start = moment(start)
        end = moment(end)

        while (end > start) {
            slices.push(start.format('HH:mm'))
            start = start.add(duration, 'minutes')
            count ++
        }
        slices
        return slices
    },
     mergeDateTime: (date, time) => {
        const merged = `${moment(date).format('YYYY-MM-DD')}T${moment(time).format('HH:mm')}`
        return merged
     },splitByValue:(array, value) =>{
        let newArray = [[]]

        array.forEach((item) => {
            if(item !== value){
                newArray[newArray.length - 1].push(item)
            }else{
                newArray.push([])
            }
        });
        return newArray
     },toHourandMinutes:(totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60

        return {hours, minutes}
     }
}