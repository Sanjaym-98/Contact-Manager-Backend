
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







app.use("/api/v1/", loginroutes);
app.use("/api/v1/", registerroutes);
app.use("/api/v1/", contactroutes)

app.get("*", (req, res) => {
  res.status(404).send("this is not a proper request ");
});

app.listen(5000, () => {
  console.log("server is up at 5000"); 
});
