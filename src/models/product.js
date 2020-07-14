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
    type:String
  }
  ],
  dislikes:[{
    type:String
  }],
  hasLike:{
    type:Boolean,
    default: false
  },
},
{
    timestamps:true
  });

  module.exports = model('Product',ProductSchema);