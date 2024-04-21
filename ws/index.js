const express = require('express');
const cors = require('cors');
const app = express ()
const morgan = require('morgan');

require('./database');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json())
app.use(cors())

//VARIABLES
app.set('port', 8000);

//ROUTES

app.use('/cliente', require('./src/routes/cliente.routes'))
app.use('/servico', require('./src/routes/servico.routes'))
app.use('/horario', require('./src/routes/horario.routes'))
app.use('/agendamento', require('./src/routes/agendamento.routes'))

app.listen(app.get('port'),  () => {
    console.log(`WS está escutando e retornando na porta ${app.get('port')}`)
});
