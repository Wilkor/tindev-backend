const Dev  = require("../models/dev");
const Product  = require("../models/product");
const Notification = require("../models/notification");

module.exports = {

   async store(req,res){

    let likedProduct =   await Product.findById(req.params.devId);
    
    const targetSocket = req.connectedUser[likedProduct.user];
    
    let infoUser =   await Dev.findById(req.headers.user);

      userLogged  =  await Dev.findById(likedProduct.user);

    

        if(!userLogged.online === true ){

          await Notification.create({
            name: infoUser.name,
            user: likedProduct.user,
            urlFireBase: infoUser.urlFireBase,
            userLogged: req.headers.user
          })
          
        }
        
        if(likedProduct.user){
        
          req.io.to(targetSocket).emit('like',infoUser);
  
        }


        return res.json({ok:'ok'})

       
     }
 


  
}
