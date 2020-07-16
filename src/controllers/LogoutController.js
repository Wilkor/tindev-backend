const Dev  = require("../models/dev");
module.exports = {

   async store(req,res){
    const {user} = req.body;
    const loggedDev =  await Dev.findOne({user:user});

         loggedDev.online = false;
        await loggedDev.save();

      return res.json({loggedDev})
   }
}