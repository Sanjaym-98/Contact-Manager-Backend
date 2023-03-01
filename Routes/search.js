const router = require('express').Router();
const Contacts = require('../Model/ContactsModel')



router.get("/contacts/:id", async(req, res)=>{
    try{
        console.log(req.params.id)
        const search = `\^${req.params.id}`
        const contacts = await Contacts.find({$and:[{email:{$regex:search}}, {userId:req.userId}]})
        res.status(200).json({
            status:"Success",
            contacts:contacts
        })
    }catch(e){
        res.status(404).json({
            status:"Failed",
            message:e.message
        })
    }
})



module.exports = router;