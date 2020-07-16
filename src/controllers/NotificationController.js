const Notification = require("../models/notification");

module.exports = {

   async index(req,res){

    const notification =  await Notification.findOne({user:req.params.id});

    return res.json({notification})
   }
}