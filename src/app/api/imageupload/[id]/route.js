import { Product_form } from "@/app/lib/model/userproduct";
import { Connect_Url } from "@/app/lib/userdb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, container) {

    try{
        let user_id = container.params.id;
        const record = { userid: user_id };
        await mongoose.connect(Connect_Url);
        let result = await Product_form.find(record);
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

