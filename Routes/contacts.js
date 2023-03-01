const router = require('express').Router();
const Contacts = require("../Model/ContactsModel")
const { urlencoded } = require('body-parser')
// Your routing code goes here


router.use(express.json())
router.use(express.urlencoded())


router.get('/contacts',async(req,res)=>{
    try{ 
        const contacts = await Contacts.find({userId:req.userId})
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


module.exports = router;