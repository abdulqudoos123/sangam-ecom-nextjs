import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { NextResponse } from 'next/server';
import { Order } from "@/models/order";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');
            // console.log('id===', id)
            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: 'id to required to get data'
                })
            }

            const orderDetails = await Order.findById(id).populate('orderItems.product')
            if (orderDetails) {
                return NextResponse.json({
                    success: true,
                    data: orderDetails,
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "your are not authenticated"
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'something wrong'
        })
    }
}