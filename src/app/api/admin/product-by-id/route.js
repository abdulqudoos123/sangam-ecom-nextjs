import { connectToDB } from "@/database";
import { Product } from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        // console.log('searchParams===', searchParams);

        const productId = searchParams.get('id');
        // console.log('productid===', productId);

        if (!productId) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "product id is required",
            })
        }
        const getProduct = await Product.findOne({ _id: productId })
        if (getProduct) {
            return NextResponse.json({
                success: true,
                data: getProduct,
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "no product found"
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "something went worng!"
        })
    }
}