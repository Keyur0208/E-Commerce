import { User_Carts } from "@/app/lib/model/usercat";
import { Connect_Url } from "@/app/lib/userdb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, container)
{
    try{
        let user_id = container.params.id;
        const record = { productid: user_id };
        await mongoose.connect(Connect_Url);
        let result = await User_Carts.find(record);
        console.log(result);
        return (
            NextResponse.json({ data: result, sucess: true }, { status: 200 })
        )
    }
    catch(error)
    {
        return (
            NextResponse.json({ data: "Some Proble in code Plz try Again", sucess: false }, { status: 400 })
        )
    }
}

export async function PUT(request,container){

    try{
        const user_id = container.params.id;
        const fillter  = {productid:user_id};
        console.log("Fillter Data = ", fillter); 
        const pay_load = await request.json();
        await mongoose.connect(Connect_Url);
        let data = await User_Carts.findOneAndUpdate(fillter,pay_load);
        return(
            NextResponse.json({result:data, sucess:true },{status:200})
        )
    }
    catch(error){
        return (
            NextResponse.json({ users: "Not Data Change", sucess: false }, { status: 400 })
        )
    }  
}

export async function DELETE(request,container)
{
    try{
        await mongoose.connect(Connect_Url);
        const data = container.params.id;
        const record = {productid:data};
        let delete_data = await User_Carts.deleteOne(record);
        return(
            NextResponse.json({result:delete_data,success:true},{status:200})
        )
    }
    catch(error)
    {
        return (
            NextResponse.json({ data: "Some Proble in code Plz try Again", sucess: false }, { status: 400 })
        )
    }
   
}