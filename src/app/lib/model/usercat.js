import mongoose from "mongoose";

const Carts = mongoose.Schema({
    
    userid:{
        type:String,
        require:true,
    },
    productid:{
        type:String,
        require:true,
        unique:true,
    },
    qty:{
        type:Number,
    },
    name:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    desc:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    total:{
        type:Number,
    },
});

export const User_Carts = mongoose.models.Cart_detatils||  mongoose.model("Cart_detatils",Carts);