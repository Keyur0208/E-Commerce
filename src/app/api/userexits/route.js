import { User_form } from "@/app/lib/model/userregister";
import { Connect_Url } from "@/app/lib/userdb"
import mongoose from "mongoose"
import { NextResponse } from "next/server";

export const GET = async () => {

    try {
        await mongoose.connect(Connect_Url);
        const user_data = await User_form.find();
        console.log("User Data = ", user_data);
        return NextResponse.json({ users: user_data, success: true }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ users: "Not Connect MogoDB", success: true }, { status: 200 })
    }
}

export const POST = async (req) => {

    try {
        const post_data = await req.json();

        if (post_data.password && post_data.email ) {
            const users = await User_form.findOne(post_data).select("-password");

            if (users) {
                return NextResponse.json({users,success:true},{ status: 200 });
            }
            else {
                return NextResponse.json({ result: "Not User Found ",success:true }, { status: 400 })
            }
        }
        else {
            return NextResponse.json({ result: "Not User" ,success:true}, { status: 400 })
        }
    }
    catch {
        return NextResponse.json({ users: "Error" }, { status: 400 })
    }
}