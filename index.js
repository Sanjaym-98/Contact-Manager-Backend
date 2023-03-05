
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./Model/UserModel');
const bodyParser = require('body-parser');
const connection = require('./Connection/connection');
connection();
const loginroutes = require('./Routes/login');
const registerroutes = require('./Routes/register');
const contactroutes = require('./Routes/contacts')
const searchroute = require('./Routes/search')
const secret = "AKPYSA";
const jwt = require('jsonwebtoken');


const cors = require('cors')
app.use(cors())

app.use("/api/v1/contacts",(req,res,next)=>{
  try{
    const token =req.headers.authorization;
    jwt.verify(token,secret,(err,result)=>{
      if(err){
        return res.status(401).json({
          status:"Failed",
          message:"Denied Authorization"
        })
      }else{
          req.userId=result.data;
          next()
      }
    })
  }catch(e){
    res.status(403).json({
      status:"error",
      message:e.message
    })
  }
})


app.use("/api/v1/contacts/:id",(req,res,next)=>{
  try{
      const token =req.headers.authorization;
      jwt.verify(token, secret,(err, result)=>{
        if(err){
            return res.status(401).json({
                status:"Failure",
                message:"Denied Authorization"
            })
        }
        else{
            req.userId = result.data;
            next();
        }
    })
  }catch(e){
    res.status(403).json({
      status:"error",
      message:e.message
  })
  }
})

const URL = "mongodb+srv://naraveniakhil:A@khil2244@instacloneserver.tqjlz9f.mongodb.net/?retryWrites=true&w=majority";

app.use("/api/v1/", loginroutes);
app.use("/api/v1/", registerroutes);
app.use("/api/v1/", contactroutes);
app.use("/api/v1/",searchroute);
app.get("*", (req, res) => {
  res.status(404).send("this is not a proper request ");
});

app.listen(5000, () => {
  console.log("server is up at 5000"); 
});
// mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology:true})
// .then(()=>console.log('Database connected Succesfully'))
// .catch((error)=> console.log(error.message));