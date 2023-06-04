const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())


//routes
const userRoute = require('./routes/user');

app.use('/users', userRoute)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Example app listening on port '+PORT+'!')
})




module.exports = { app }