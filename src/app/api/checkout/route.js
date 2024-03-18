import { User_Chechout } from "@/app/lib/model/usercheckout";
import { Connect_Url } from "@/app/lib/userdb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { cache } from "react";

export async function GET()
{
    try
    {
        await mongoose.connect(Connect_Url);
        let user_data = await User_Chechout.find();
        return NextResponse.json({message:user_data,succeess:true},{status:200});
    }
    catch(error)
    {
        return NextResponse.json({message:"Plz Again Try",suceess:false},{status:400});
    }
}


export async function POST(req)
{
    try{
        const post_data = await req.json();
        const {name,address,country,state, zip, email, phone, order_note}  = post_data;
        await mongoose.connect(Connect_Url);
        let user_data = await User_Chechout.create({name,address,country,state, zip, email, phone, order_note})
        return NextResponse.json({message:user_data,succeess:true},{status:200});
    }
    catch(error)
    {
        return NextResponse.json({message:"Code in Some Problem",suceess:false},{status:400});
    }
}
