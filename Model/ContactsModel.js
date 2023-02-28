const mongooose = require('mongoose');
const objectId = require('mongoose').objectId

const contactSchema = new mongooose.Schema({
    // Your code goes here
    name : {type: String},
    designation : {type: String},
    company : {type:String},
    industry : {type: String},
    email : {type: String},
    phoneNumber : {type: Number},
    country : {type: String},
    userId : {type : objectId, required : true}
},{timestamps : true})

const Contacts = mongooose.model('contactmanager', contactSchema);

module.exports = Contacts;