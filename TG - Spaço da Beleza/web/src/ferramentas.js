// eslint-disable-next-line
export default {
    hourToMinutes: (time) =>{
        const [hour, minutes] = time.split(':')
        return parseInt(parseInt(hour) * 60 + parseInt(minutes))
    }
}