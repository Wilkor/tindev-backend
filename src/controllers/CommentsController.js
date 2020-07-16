const Product = require('../models/product');

module.exports = {

  async store(req,res){
   const {name, product, avatar} =  req.body

   const productModel = await Product.findById(product)

   const targetSocket = req.connectedUser[productModel.user];

   req.io.to(targetSocket).emit('comments',  {product, avatar, name,  message:`${name}, acabou de comentar um post seu!`});
   return res.json({ok:'ok'})
  }
}