import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Address } from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');
            // console.log('id=========', id)
            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "failed to get id"
                })
            }
            const deleteAddress = await Address.findByIdAndDelete(id)
            if (deleteAddress) {
                return NextResponse.json({
                    success: true,
                    message: 'address deleted successfully'
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'failed to delete'
                })
            }
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "something went wrong"
        })
    }
}