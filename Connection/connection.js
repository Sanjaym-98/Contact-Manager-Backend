const mongoose = require('mongoose');
async function Main(){
    await mongoose.connect('mongodb://localhost/contactmanager')
    console.log("connected to mongodb")
}        

module.exports = Main;