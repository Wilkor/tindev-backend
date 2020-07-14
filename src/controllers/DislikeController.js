const Dev  = require("../models/dev");
const Product = require("../models/product");
module.exports = {

   async store(req,res){

    const loggedDev =  await Dev.findOne(req.headers.user);
    const targetDev = await Dev.findOnde(req.params.devId);

    if(!targetDev){
        return res.status(404).json({error:'Dev not exists'})
    }


  
    const filter2 = { user: req.params.devId};
    const update = { hasLike: true };
    
    await Product.findOneAndUpdate(filter2, update, {
     new: true
   });


    loggedDev.dislikes.push(targetDev._id)

    await loggedDev.save();

   return res.json({loggedDev})
   }
}