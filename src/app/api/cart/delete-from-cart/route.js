import { connectToDB } from "@/database"
import { AuthUser } from "@/middleware/AuthUser";
import { Cart } from "@/models/cart";
import { NextResponse } from "next/server";


export async function DELETE(req) {
    try {
        connectToDB();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');

            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "cart id is required"
                })
            }
            const deleteCart = await Cart.findByIdAndDelete(id);
            if (deleteCart) {
                return NextResponse.json({
                    success: true,
                    message: "cart deleted successfully"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "failed to delete"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "please login first"
            })
        }
    } catch (error) {
        console.log(error)
    }
}