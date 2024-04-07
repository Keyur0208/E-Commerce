import mongoose from "mongoose";

const Checkout = mongoose.Schema({

    customerId:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    zip:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    order_note:{
        type:String,
        require:true
    },
});

export const User_Chechout =  mongoose.models.Checkout_details || mongoose.model("Checkout_details",Checkout);
