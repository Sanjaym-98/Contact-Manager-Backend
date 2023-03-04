const express = require('express');
const mongoose = require('mongoose');
const User=require('../Model/UserModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const secret ="AKPYSA";

router.use(express.urlencoded());
router.use(express.json());

// const { body, validationResult } = require('express-validator');
// body('email').isEmail(),
// body('password').isLength({min:6,max:12}),
router.post("/register",

async(req, res)=>{
try{
    // const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }

        const {email,password}= req.body;
        const user = await User.findOne({email});

        if(user){
            return res.status(409).json({
                status:"Failed",
                message:"User Already Exists!"
            })
        }
// status code 409 is for duplicate request
bcrypt.hash(password, 10, async function (err, hash) {
    // Store hash in your password DB.
    if (err) {
        return res.status(500).json({
            status: "Failed",
            message: err.message

        })
    }
    const data = await User.create({
        email,
        password: hash
    })
    return res.status(201).json({
        status:"Success",
        message:"Registration is done successfully",
        data
    })

})
}catch(e){
    res.status(500).json({
        status:"Failed",
        message:e.message
    })
}
})

module.exports = router;

