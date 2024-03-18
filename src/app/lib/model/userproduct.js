import mongoose from "mongoose";

const AddProduct =  mongoose.Schema({

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
    userid:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
});

export const Product_form = mongoose.models.productdata || mongoose.model("productdata",AddProduct);

