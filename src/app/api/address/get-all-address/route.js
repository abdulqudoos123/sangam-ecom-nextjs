import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Address } from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        // console.log('=======id', id)
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "you are not logged in"
            })
        }
        const isAuthUser = await AuthUser(req);
        // console.log('isauhguser===', isAuthUser)
        if (isAuthUser) {

            const getAllAddress = await Address.find({ userId: id });
            // console.log('getalladdress===',getAllAddress)
            if (getAllAddress) {
                return NextResponse.json( {
                    success: true,
                    data: getAllAddress,
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "failed to get data"
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