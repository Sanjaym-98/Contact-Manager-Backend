const router = require('express').Router();
const express = require("express")
const Contacts = require("../Model/ContactsModel")
// const { urlencoded } = require('body-parser')
const bodyParser =  require("body-parser")
// Your routing code goes here
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

// router.use(express.json())
// router.use(express.urlencoded())


router.get('/contacts',async(req,res)=>{
    try{ 
        const contacts = await Contacts.find({userId:req.userId})
        console.log(req.userId)
        res.status(201).json({
            
            status:"Success",
            contacts:contacts
        })
    }catch(e){
        res.status(404).json({
            status:"Failed",
            message: e.message 
        })
    }

})



router.post('/contacts',async(req,res)=>{
    try{
        console.log("inside")
        const contacts = await Contacts.create(req.body)
        console.log(req.body)
        res.status(201).json({
            status:"Success",
            contacts
        })
    }catch(e){
        res.status(404).json({
            status:"Failed",
            message: e.message
        })
    }
})

router.delete('/contacts', async (req, res) => {
    try {
        
        const data = await Contacts.deleteMany({_id:{$in:req.body}})
        console.log(data)
        res.status(200).json({
            status : "success",
            data
        })
    } catch (e) {
        res.status(404).json({
            status : "Failed",
            message : e.message
        })
    }
})

module.exports = router;