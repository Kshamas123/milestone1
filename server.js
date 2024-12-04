const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const statusQueue = require('./utils/statusqueue');
const cron=require('node-cron')


const menuroutes = require('./routes/menu');
const orderroutess=require('./routes/orders')



app.use(bodyParser.json()); 

// Use the routes
app.use('/menu', menuroutes);
app.use('/order',orderroutess);

cron.schedule('*/1 * * * *', () => { // Runs every minute
    console.log('Processing order status...');
    statusQueue.processQueue();
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});