import { User_form } from "@/app/lib/model/userregister";
import { Connect_Url } from "@/app/lib/userdb"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await mongoose.connect(Connect_Url);
        const user_data = await User_form.find();
        console.log(user_data);
        return NextResponse.json({users:user_data,success:true },{status:200})  

    } catch (error) {
        return NextResponse.json({users:"Not Connected Mogoodb",success:false},{status:400})        
    }
}

export const POST = async (request) => {
    try{
        const post_data = await request.json();
        const { name,email,password } = post_data;
        await mongoose.connect(Connect_Url);
        const users = await User_form.create({name,email,password});
        console.log(users);
        return NextResponse.json({users,success:true },{status:200})
    }
    catch{
        return NextResponse.json({users:"Not Insert Data Any Proble in Mogodb" ,success:false},{status:400})    
    }

}