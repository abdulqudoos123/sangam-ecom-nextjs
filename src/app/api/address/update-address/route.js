import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Address } from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const data = await req.json();
            // console.log('datassss',data)
            const { _id, fullName, city, country, postalCode, address } = data;
            const updateAddress = await Address.findOneAndUpdate(
                { _id: _id }, { fullName, address, city, country, postalCode },
                { new: true });
            if (updateAddress) {
                return NextResponse.json({
                    success: true,
                    message: "address successfully updated"
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'failed to update'
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
            message: "something went wrong",error
        })
    }
}