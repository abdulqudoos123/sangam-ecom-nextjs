import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Product } from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function DELETE(req) {
    try {
        await connectToDB();
        // const productId = req.query.id;
        const isAuthUser = await AuthUser(req);
        // console.log('isAuthUser====',isAuthUser);
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "product is is required"
            })
        }
        if (isAuthUser.role === 'admin') {
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (deletedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "product deleted successfully"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "failed to delete product"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not an admin ... Not authorized "
            })
        }

    } catch (error) {
        console.log(error)
    }
}