const Dev  = require("../models/dev");
const Product  = require("../models/product");
const Notification = require("../models/notification");

module.exports = {

   async store(req,res){

    let likedProduct =   await Product.findById(req.params.devId);

    const targetSocket = req.connectedUser[likedProduct.user];
    let infoUser =   await Dev.findById(req.headers.user);
      userLogged  =  await Dev.findById(likedProduct.user);



        if (!likedProduct.likes.includes(req.headers.user)) {
          
          if(!userLogged.online){
  
            await Notification.create({
              name: infoUser.name,
              user: likedProduct.user,
              urlFireBase: infoUser.urlFireBase,
              userLogged: req.headers.user,
              produtctId: likedProduct._id
            });
            likedProduct.likes.push(req.headers.user);
            likedProduct.save();
          } 

          return res.json({message:'Você já curtiu esse produto!'});

        } else {
          
          req.io.to(targetSocket).emit('like',infoUser);
          likedProduct.likes.push(req.headers.user);
          likedProduct.save();
         
          return res.json({ok:'ok'})
        }

        
     }
 


  
}
