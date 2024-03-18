import mongoose from "mongoose";

const UserRegisterdetails = mongoose.Schema({

    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:Number
    },
    gender:{
        type:String
    }
});

export const User_form =  mongoose.models.registerdata  || mongoose.model("registerdata",UserRegisterdetails) 