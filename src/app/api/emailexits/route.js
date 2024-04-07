import { User_form } from "@/app/lib/model/userregister";
import { Connect_Url } from "@/app/lib/userdb"
import mongoose from "mongoose"
import { NextResponse } from "next/server";

export const GET = async () =>{

    try{
        await mongoose.connect(Connect_Url);
        const user_data = await User_form.find();
        console.log("User Data = ",user_data);
        return NextResponse.json({users:user_data,success:true },{status:200})
    }
    catch(error){
        return NextResponse.json({users:"Not Connect MogoDB" , success:true },{status:200})
    }
}


export const POST = async (req) => {

    try{
        const {email,password} = await req.json();
        await mongoose.connect(Connect_Url);
        const user_email = await User_form.findOne({email}).select("_id");
        const user_password = await User_form.findOne({password}).select("_id");
        console.log(user_email);
        return NextResponse.json({user_email,user_password},{status:200}); 
    }
    catch{
        return NextResponse.json({users:"Error"},{status:400})    
    }
}
