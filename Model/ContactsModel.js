const mongooose = require('mongoose');
const ObjectId = require('mongoose').ObjectId

const ContactSchema = new mongooose.Schema({
    // Your code goes here
    name : {type: String},
    designation : {type: String},
    company : {type:String},
    industry : {type: String},
    email : {type: String},
    phoneNumber : {type: Number},
    country : {type: String},
    userId : {type : ObjectId, ref : "usermanager"}
},{timestamps : true})

const Contacts = mongooose.model('contactmanager', ContactSchema);

module.exports = Contacts; 