
import { AuthUser } from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")("sk_test_51OeuBDJdQiWXZG8sU5yGcidb4Gejcqtvsb5LOCB8M2GrNaiZ0fjXozYJJ4PkYTco4E4yWFc2xfM9RxoOwF2ovSGk00z25DeJ9j")
export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const isAuthUser = await AuthUser(req);
        // console.log('authuserstripe===',isAuthUser)
         if (isAuthUser) {

            const res = await req.json();
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: res,
                mode: "payment",
                success_url: "http://localhost:3000/checkout" + "?status=success",
                cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
            });

            return NextResponse.json({
                success: true,
                id: session.id,
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not authenticated",
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            success: false,
            message: 'something went wrong'
        })
    }
}