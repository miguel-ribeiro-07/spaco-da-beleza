require('dotenv').config()

const mongoose = require('mongoose');
const URI = `mongodb+srv://spacodabelezaUser:${process.env.DB_KEY}@clusterdev.urszlpv.mongodb.net/spaco-da-beleza?retryWrites=true&w=majority`;

mongoose.connect(URI).then(() => console.log('MongoDB is online')).catch(() => console.log(err));
