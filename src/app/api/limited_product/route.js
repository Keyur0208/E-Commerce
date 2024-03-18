import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Connect_Url } from "@/app/lib/userdb";
import { Product_form } from "@/app/lib/model/userproduct";


export  async function GET(request) {
    try {
        await mongoose.connect(Connect_Url);
        let searchResults = await Product_form.find().limit(3);
        return NextResponse.json({ result: searchResults, success: true }, { status: 200 }) 
    }
    catch (error) {
        return NextResponse.json({ result: "Not Connected Mogoodb", success: false }, { status: 400 })
    }
}

