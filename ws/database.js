// need .env

const mongoose = require('mongoose');
const URI = 'mongodb+srv://spacodabelezaUser:5HAmVaH622QHtSrv@clusterdev.urszlpv.mongodb.net/spaco-da-beleza?retryWrites=true&w=majority';

mongoose.connect(URI).then(() => console.log('DB is online')).catch(() => console.log(err));
