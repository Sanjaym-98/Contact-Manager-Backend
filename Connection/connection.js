const mongoose = require('mongoose');
const URL = "mongodb+srv://naraveniakhil:Aakhil2244@instacloneserver.tqjlz9f.mongodb.net/?retryWrites=true&w=majority";
async function Main(){
    // await mongoose.connect('mongodb://localhost/contactmanager')
    // console.log("connected to mongodb")
    await mongoose.connect(URL,{useNewUrlParser: true, useUnifiedTopology:true})
       
    console.log("connected to MongoDB")
}        

module.exports = Main;