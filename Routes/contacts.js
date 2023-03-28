const router = require('express').Router();
const express = require("express")
const Contacts = require("../Model/ContactsModel");
const multer=require('multer')
const csv = require('csvtojson')
// const { urlencoded } = require('body-parser')
const bodyParser =  require("body-parser")
// Your routing code goes here
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

// router.use(express.json())
// router.use(express.urlencoded())


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

router.get('/contacts',async(req,res)=>{
    try{ 
        const {page = 1} = req.query
        const contacts = await Contacts.find({userId:req.userId}).skip((page-1)*8).limit(8);
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
        // console.log("inside")
        // const contacts = await Contacts.create(req.body)
        // console.log(req.body)
        // res.status(201).json({
        //     status:"Success",
        //     contacts
        // })
        // const userID = req.body.userId
    
        // csv()
        //   .fromFile(req.file.path)
        //   .then(jsonData => {
        //     const dataWithUserId = jsonData.map(data => ({...data, userID}));
        //     Contacts.insertMany(dataWithUserId, function(error, documents) {
        //       if (error) return res.status(500).send(error);
        //       res.status(200).json({data:documents});
        //     });
        const userId = req.userId
        const contactsArr = req.body
        console.log(req.body)
        const contactDetails = contactsArr.map(data=>{return{...data, userId:userId}})
        console.log(contactDetails)
        const data =await Contacts.create(contactDetails)
        res.status(201).json({
            status:"Success",
            message:"posted Success fully",
            data
          });
        
    }catch(e){
        res.status(404).json({
            status:"Failed path file",
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