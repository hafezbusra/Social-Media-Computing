const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb+srv://hafezbusra:abcd1234@sma-xjgsv.mongodb.net/twitter';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));
mongoose.set("debug", true)