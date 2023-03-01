const express = require(express);
const mongoose = require(mongoose);
const User=require('../Model/UserModel');
const router = require('express-router');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const secret ="AKPYSA";


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

const { body, validationResult } = require('express-validator');
router.post("/login", body('email').isEmail(),async(req,res)=>{
    try{

        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {email, password}=req.body;
            const user =await User.findOne({email});
            if(!user){
                res.status(400).json({
                    status:"Failed",
                    message:"User is not Registered"
                })
            }
            bcrypt.compare(password, user.password, function (err, result){
                if(err){
                    res.status(500).json({
                        status:"Failed",
                        message:err.message
                    })
                }
                if(result){
                    const token = jwt.sign({
                        exp:Math.floor(Date.now() /1000)+(60*60),
                        data:user._id,
                    },secret);
                    return res.status(201).json({
                        status:"Success",
                        message:"Login done",
                        token
                    })
                }else {
                    res.status(400).json({
                        status:"Failed",
                        message:"Invalid Crendentials"
                    })
                }
            })

    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:e.message
        })
    }
})

module.exports =router