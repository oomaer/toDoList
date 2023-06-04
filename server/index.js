const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors())


//routes
const userRoute = require('./routes/user');

const main = async () => {
    const db = 'mongodb://localhost:27017/todolistdb';
    await mongoose.connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true, //make this also true
    });
    app.use('/users', userRoute)

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log('Example app listening on port '+PORT+'!')
    })
}

main();

module.exports = { app }