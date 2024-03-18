import { User_Carts } from "@/app/lib/model/usercat";
import { Connect_Url } from "@/app/lib/userdb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET()
{
    try{
        await mongoose.connect(Connect_Url);
        const cart_data = await User_Carts.find();
        return NextResponse.json({data:cart_data,sucesss:true},{status:200})
    }
    catch(error){
        return NextResponse.json({data:"Not Connect MongoDb Plz Proble Plz Agin Try",sucesss:false},{status:400})
    }
}




