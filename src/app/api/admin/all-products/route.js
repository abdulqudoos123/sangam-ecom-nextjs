import { connectToDB } from "@/database";
import { Product } from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req) {

    try {
        await connectToDB();

        const getAllProducts = await Product.find({});
        // console.log('all products ===', getAllProducts);
        if (getAllProducts) {
            return NextResponse.json({
                success: true,
                message: "getting all products ",
                data: getAllProducts,
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "No product found"
            })
        }

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            success: false,
            message: "failed to get products"
        })
    }
}