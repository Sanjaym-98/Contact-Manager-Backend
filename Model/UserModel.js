const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const UserModelSchema = new Schema ({
    email:{type:String,unique:true},
    password:{type:String,min:6,max:12}
},{timestamps:true})

const User = mongoose.model("usermanager",UserModelSchema);

module.exports =User;