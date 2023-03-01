const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000
const app = require('./src/Connection/conection');
app();
// mongoose.connect('mongodb://localhost/contactmanager', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.on('open', () =>{
    console.log('connection established')
}).on('connectionError',(err) =>{
    console.log(err);
})

app.listen(port, () => console.log(`App listening on port ${port}!`));

