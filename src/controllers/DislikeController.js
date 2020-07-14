const Dev  = require("../models/dev");
const Product = require("../models/product");
module.exports = {

   async store(req,res){

    const loggedDev =  await Dev.findById(req.headers.user);
   //const targetDev = await Dev.findOnde(req.params.devId);

    if(!targetDev){
        return res.status(404).json({error:'Dev not exists'})
    }


    const filter = { user: req.headers.user };
    const update = { hasLike: true };
    
     await Product.findByIdAndUpdate(filter, update, {
      new: true
    });

      loggedDev.dislikes.push(targetDev._id)

      await loggedDev.save();

   return res.json({loggedDev})
   }
}