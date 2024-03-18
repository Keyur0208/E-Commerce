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

export async function POST(request){

    try{
        const post_data = await request.json();
        const {userid,productid,qty,name,price,desc,image,total} = post_data;
        await mongoose.connect(Connect_Url);
        const cart_data = await User_Carts.create({userid,productid,qty,name,price,desc,image,total});
        console.log(cart_data);

        
        return NextResponse.json({data:cart_data,success:true},{status:200});
    }
    catch(error)
    {
        return NextResponse.json({data:"Some Problem in Code",success:false},{status:400});
    }
}


