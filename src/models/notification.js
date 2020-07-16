const {Schema,model} = require("mongoose");

const NotificationSchema = new Schema({

  name:{
    type:String,
    required:true
  },

  user:{
    type:String,
    required:true
  },
  urlFireBase:{
    type:String,
    required:true
  },
  userLogged:{
    type:String
  },
  productId:{
    type:String
  }
},
{
    timestamps:true
  });

  module.exports = model('Notification',NotificationSchema);