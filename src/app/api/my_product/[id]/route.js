import { Connect_Url } from "@/app/lib/userdb";
import { Product_form } from "@/app/lib/model/userproduct";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,container)
{
    try{
        let product_id = container.params.id;
        const record = { _id: product_id };
        await mongoose.connect(Connect_Url);
        let data = await Product_form.find(record);
        return NextResponse.json({result:data,success:true},{status:200});
    }
    catch(error)
    {
        return NextResponse.json({result:"Some Proble in Code",success:false},{status:400})
    }
}

export async function PUT(request,container){

    try{
        const user_id = container.params.id;
        const fillter  = {_id:user_id};
        console.log("Fillter Data = ", fillter); 
        const pay_load = await request.json();
        await mongoose.connect(Connect_Url);
        let data = await Product_form.findOneAndUpdate(fillter,pay_load);
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
    const data = container.params.id;
    const record = {_id:data};
    await mongoose.connect(Connect_Url);
    let delete_data = await Product_form.deleteOne(record);
    return(
        NextResponse.json({result:delete_data,success:true},{status:200})
    )
}
