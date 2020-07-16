const Notification = require("../models/notification");

module.exports = {

   async index(req,res) {

    const notification =  await Notification.findOne({user:req.params.id});

    if(!notification) {

       return res.json({notification});

    }

    return res.json([]);

   }
}