const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
const userRoute = require('./routes/userRoute');
const todoRoute = require('./routes/todoRoute');
const { connectToDb } = require('./services/DBService');

const main = async () => {
    
    const db = `${process.env.MONGO_URI}`;
    const environment = process.env.Node_ENV;

    try{    
        const connection = await connectToDb(db, environment);
        if(!connection){
            console.log('Error connecting to db');
            return;
        }
        app.use('/user', userRoute)
        app.use('/todo', todoRoute)

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })
    
        const PORT = process.env.PORT || 5000;
    
        if(environment!=='test'){
            app.listen(PORT, () => {
                console.log('App listening on port '+PORT+'!')
            })
        }

    }
    catch(err){
        console.log(err);
    }
}

main();

module.exports = { app }