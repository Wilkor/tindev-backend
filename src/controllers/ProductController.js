const Product  = require("../models/product");

module.exports = {

  async index(req,res){

    const products = await Product.find()
 
        return res.json(products)


  },

async store(req,res){

   const {productName, user, urlFireBase, image, category } = req.body

   const userExists = await Product.findOne({productName:productName})
   if(userExists){
       return res.json(userExists)
   }

   const  product = await Product.create({
    productName, user, urlFireBase, image, category 

   }).catch(err=>{

      console.log(err)
   })
   return res.json(product)

}


}