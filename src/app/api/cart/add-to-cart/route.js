import { connectToDB } from "@/database"
import { AuthUser } from "@/middleware/AuthUser";
import { Cart } from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";


const addToCartSchema = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
})


export async function POST(req) {
try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        // console.log('authuer====',isAuthUser)
        if (isAuthUser) {
            const cartData = await req.json();
            const { userId, productId } = cartData;
            const { error } = addToCartSchema.validate({ userId, productId });
            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                })
            }

            const itemAlreadyExist = await Cart.find({
                userId: userId,
                productId: productId
            })
            // console.log('productid userid===', productId, userId)

            // console.log('alreadyexist====', itemAlreadyExist)
            if (itemAlreadyExist?.length > 0) {
                return NextResponse.json({
                    success: false,
                    message: "porduct is already added in the cart"
                })
            }
            const saveProductToCart = await Cart.create(cartData);
            // console.log('saveproductcart===', saveProductToCart)
            if (saveProductToCart) {
                return NextResponse.json({
                    success: true,
                    message: "product successfully added in cart"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "failed to add in the cart"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not authenticated",
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "something went wrong"
        })
    }
}