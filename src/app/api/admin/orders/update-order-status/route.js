import { connectToDB } from '@/database';
import { AuthUser } from '@/middleware/AuthUser';
import { Order } from '@/models/order';
import { NextResponse } from 'next/server'


const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        // console.log('authuser====', isAuthUser)
        if (isAuthUser.role === 'admin') {
           
            const data = await req.json();
            // console.log('data --- ', data);
            const {
                _id,
                shippingAddress,
                orderItems,
                paymentMethod,
                isPaid,
                paidAte,
                isProcessing
            } = data;
            
            const updateOrder = await Order.findOneAndUpdate({ _id: _id }, {
                shippingAddress,
                orderItems,
                paymentMethod,
                isPaid,
                paidAte,
                isProcessing
            }, { new: true })
            if (updateOrder) {
                return NextResponse.json({
                    success: true,
                    message: 'order successfully updated'
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'failed to update order'
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: 'you are not authenticated',
            })
        }
    } catch (error) {
        console.log('error :: ', error);
        return NextResponse.json({
            success: false,
            message: "something went wrong"
        })
    }
}