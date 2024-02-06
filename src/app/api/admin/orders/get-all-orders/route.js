import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Order } from "@/models/order";
import { NextResponse } from 'next/server'


const dynamic = "force-dynamic";


export async function GET(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser.role === 'admin') {
            const getAllOrders = await Order.find().populate('orderItems.product').populate('user');
            if (getAllOrders) {
                return NextResponse.json({
                    success: true,
                    data: getAllOrders,
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'failed to fetch orders'
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not authenticated"
            })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "something went wrong"
        })
    }
}