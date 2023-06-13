
const mongoose = require('mongoose');

const connectToDb = async (url, environment) => {
    return await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName: environment === 'test' ? 'testtodo' : 'todo'
    });
}

module.exports = {
    connectToDb
}