const express = require('express');
const cors = require('cors');
const app = express ()
const morgan = require('morgan');
//const busboy = require('connect-busboy');
//const busboyBodyParser = require('busboy-body-parser')

require('./database');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json())
app.use(cors())
//app.use(busboy())
//app.use(busboyBodyParser())

//VARIABLES
app.set('port', 8000);

//ROUTES
app.use('/cliente', require('./src/routes/cliente.routes'))
app.use('/servico', require('./src/routes/servico.routes'))

app.listen(app.get('port'),  () => {
    console.log(`WS está escutando e retornando na porta ${app.get('port')}`)
});