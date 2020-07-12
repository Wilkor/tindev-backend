const Product  = require("../models/product");

module.exports = {



  async myIndex(req,res){

    const user = req.params.id;

    const products = await Product.find({user:{$in:[user]}});
 
    console.log(products)
    return res.json(products)


  },

  async index(req,res){

    const user = req.params.id;

    const products = await Product.find({user:{$nin:[user]}});
 
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

},
async delete(req,res){

  const id = req.params.id

  const deleted = await Product.findByIdAndDelete(id)

  return res.json(deleted)

}


}