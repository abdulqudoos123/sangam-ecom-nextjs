import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Cart } from "@/models/cart";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        // console.log('atthuser===', isAuthUser);
        if (isAuthUser) {
            const { searchParams } = new URL(req.url)

            const id = searchParams.get('id')
            // console.log('id====', id);
            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "please login first"
                })
            }
            const allCartItems = await Cart.find({ userId: id }).populate('productId')
            // console.log('allcartites===', allCartItems);
            if (allCartItems) {
                return NextResponse.json({
                    success: true,
                    data: allCartItems,
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "no cart items found"
                })
            }
        }else{
            return NextResponse.json({
                success:false,
                message:'you are not authenticated'
            })
        }

    } catch (error) {
        console.log(error);
    }
}