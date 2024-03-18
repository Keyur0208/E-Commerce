import { User_Carts } from "@/app/lib/model/usercat";
import { Connect_Url } from "@/app/lib/userdb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, container)
{
    try{
        let user_id = container.params.id;
        const record = { userid: user_id };
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

// export async function DELETE(request,container)
// {
//     try{
//         await mongoose.connect(Connect_Url);
//         const data = container.params.id;
//         const record = {userid:data};
//         let delete_data = await Cart_deatils.deleteOne(record);
//         return(
//             NextResponse.json({result:delete_data,success:true},{status:200})
//         )
//     }
//     catch(error)
//     {
//         return (
//             NextResponse.json({ data: "Some Proble in code Plz try Again", sucess: false }, { status: 400 })
//         )
//     }
   
// }