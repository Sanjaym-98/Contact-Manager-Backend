const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.objectId;


const UserModelSchema = new Schema ({
    email:{type:String,unique:true},
    password:{type:String, requires:true}
},{timestamps:true})

const User = mongoose.model("contactmanager",UserModelSchema);

module.exports =User;