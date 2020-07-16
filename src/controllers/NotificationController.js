const Notification = require("../models/notification");

module.exports = {

   async index(req,res) {

    const notification =  await Notification.findOne({user:req.params.id});

    if(!notification) {

       return res.json([]);
       
   }
   return res.json({notification});


   }
}