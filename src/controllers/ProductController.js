const Product  = require("../models/product");

module.exports = {

  async index(req,res){


  },

async store(req,res){

   const {productName} = req.body

   const userExists = await Product.findOne({productName:productName})
   if(userExists){
       return res.json(userExists)
   }

   const  dev = await Product.create({
     

   }).catch(err=>{

      console.log(err)
   })
   return res.json(dev)

}


}