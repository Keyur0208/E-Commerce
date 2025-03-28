
import { User_form } from "@/app/lib/model/userregister";
import { Connect_Url } from "@/app/lib/userdb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, container) {

    try{
        let user_id = container.params.id;
        const record = { _id: user_id };
        console.log(record);
        await mongoose.connect(Connect_Url);
        let result = await User_form.findById(record);
        console.log(result);
        return (
            NextResponse.json({ users: result, sucess: true }, { status: 200 })
        )
    }
    catch (error){
        return (
            NextResponse.json({ users: "Not Data Avaiable", sucess: false }, { status: 400 })
        )
    }
}


export async function PUT(request,container){

    try{
        const user_id = container.params.id;
        const fillter  = {_id:user_id};
        console.log("Fillter Data = ", fillter); 
        const pay_load = await request.json();
        await mongoose.connect(Connect_Url);
        let result = await User_form.findOneAndUpdate(fillter,pay_load);
        return(
            NextResponse.json({ueres:result , sucess:true },{status:200})
        )
    }
    catch(error){
        return (
            NextResponse.json({ users: "Not Data Change", sucess: false }, { status: 400 })
        )
    }  
}
