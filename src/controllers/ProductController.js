const Product  = require("../models/product");
const Dev  = require("../models/dev");
module.exports = {



  async myIndex(req,res){

    const user = req.params.id;

    const products = await Product.find({user:{$in:[user]}});
 
    console.log(products)
    return res.json(products)


  },

  async index(req,res){

    const user = req.params.id;
    const loggedDev = await Product.findOne({user:user});

    const userProduct = await Product.find({
        $and:[
            {_id:{$ne:user}},
            {_id:{$nin:loggedDev.likes}},
            {_id:{$nin:loggedDev.dislikes}}
    ],
    })

    return res.json(userProduct)

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