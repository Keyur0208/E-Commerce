import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises'
import mongoose from "mongoose";
import { Connect_Url, Image_url } from "@/app/lib/userdb";
import { Product_form } from "@/app/lib/model/userproduct";

export  async function GET() {
    try {
        await mongoose.connect(Connect_Url);
        const data = await Product_form.find();
            return NextResponse.json({ result: data, success: true }, { status: 200 })
    }
    catch (error) {

        return NextResponse.json({ result: "Not Connected Mogoodb", success: false }, { status: 400 })
    }
}

export async function POST(req) {

    try {   
        await mongoose.connect(Connect_Url);
        const post_data = await req.formData();
        const file = post_data.get("file");
        const name = post_data.get("name");
        const price = post_data.get("price");
        const desc = post_data.get("desc");
        const userid = post_data.get("userid");
        const bytData = await file.arrayBuffer();
        const buffer = Buffer.from(bytData);
        const path = `./public/upload/${file.name}`;
        await writeFile(path,buffer);
        let image = file.name;
        const picture = await Product_form.create({name,price,desc,image,userid});
        console.log("Upload Picture = ",picture);
        return NextResponse.json({picture , success: true }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ result: error, success: false }, { status: 400 })
    }
}
