import { connectToDB } from "@/database";
import { Product } from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
    //   console.log('searparma===', searchParams);  
        const id = searchParams.get('id');
        // console.log('id====', id);
        const getData = await Product.find({ category: id });
        // console.log('getData===',getData);
        if (getData) {
            return NextResponse.json({
                success: true,
                data: getData,
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "data not found"
            })
        }
    } catch (error) {
        console.log(error, error.message);
        return NextResponse.json({
            success: false,
            message: "something went wrong!"
        })
    }
}