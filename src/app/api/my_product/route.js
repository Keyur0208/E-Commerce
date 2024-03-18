import { Product_form } from "@/app/lib/model/userproduct";
import { Connect_Url } from "@/app/lib/userdb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET()
{
    try{
        await mongoose.connect(Connect_Url);
        const product_id = await Product_form.find();
        return NextResponse.json({result:product_id,success:true},{status:200});
    }
    catch(error)
    {
        return NextResponse.json({result:"Some Proble in Code",success:false},{status:400})
    }

}

