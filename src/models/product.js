const {Schema,model} = require("mongoose");

const ProductSchema = new Schema({

  productName:{
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
  category:{
    type:String,
    required:true
  },
  
  likes:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
  ],
  dislikes:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }]
},
{
    timestamps:true
  });

  module.exports = model('Product',ProductSchema);