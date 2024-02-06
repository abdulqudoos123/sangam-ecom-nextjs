import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Order } from "@/models/order";
import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic";


export async function GET(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        // console.log('allorereer===',isAuthUser)
        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');
            // console.log('id====',id)
            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "id is required to get order data"
                })
            }
            
            const getAllOrders = await Order.find({ user: id }).populate('orderItems.product')
            if (getAllOrders) {
                return NextResponse.json({
                    success: true,
                    data: getAllOrders,
                    message: 'all orders get successfully'
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "you are not authenticated",
                })
            }
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "something worng"
        })
    }
}