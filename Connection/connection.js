const mongoose = require('mongoose');
async function Main(){
    await mongoose.connect('mongodb+srv://SanjayM:Mundasad@1998@cluster0.jfdlxyl.mongodb.net/contactmanager?retryWrites=true&w=majority')
    console.log("connected to mongodb")
}        

module.exports = Main;