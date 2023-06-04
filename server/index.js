const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
const userRoute = require('./routes/userRoute');
const todoRoute = require('./routes/todoRoute');

const main = async () => {
    const db = 'mongodb://0.0.0.0:27017/todolistdb';
    try{    
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: true, //make this also true
        });
        app.use('/users', userRoute)
        app.use('/todo', todoRoute)

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })
    
        const PORT = process.env.PORT || 5000;
    
        app.listen(PORT, () => {
            console.log('Example app listening on port '+PORT+'!')
        })

    }
    catch(err){
        console.log(err);
    }
}

main();

module.exports = { app }