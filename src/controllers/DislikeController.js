const Dev  = require("../models/dev");
const Product = require("../models/product");
module.exports = {

   async store(req,res){

    const loggedDev =  await Product.findById(req.headers.user);

         loggedDev.hasLike = true;
        await loggedDev.save();

      return res.json({loggedDev})
   }
}