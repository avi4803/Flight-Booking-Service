const express = require('express');
const { Queue } = require('./config');
const dotenv  = require('dotenv').config({path:'../.env'});
const apiRoutes = require('./routes');
const CRON = require('./utils/common/cron-jobs');
const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);
app.use('/bookingService/api', apiRoutes);
// app.use('/api2', (req , res) => {
//     console.log('working');
//     res.send('working')
    
// });


app.listen(process.env.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${PORT}`);
    CRON();
    await Queue.connectQueue();
    console.log("queue connected")
});
