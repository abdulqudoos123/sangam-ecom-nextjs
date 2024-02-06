import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Cart } from "@/models/cart";
import { Order } from "@/models/order";
import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        // console.log('authuser===', isAuthUser)
        if (isAuthUser) {
            const data = await req.json();
            const { user } = data;
            const saveNewOrder = await Order.create(data);
            if (saveNewOrder) {
                await Cart.deleteMany({ userId: user });
            }
            if (saveNewOrder) {
                return NextResponse.json({
                    success: true,
                    message: 'products are on the way!'
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'failed to create order'
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not authenticated"
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "something went wrong"
        })
    }
}