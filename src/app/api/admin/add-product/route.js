import { connectToDB } from "@/database";
import { NextResponse } from 'next/server'
import Joi from 'joi'
import { Product } from "@/models/product";
import { AuthUser } from "@/middleware/AuthUser";


const AddProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    sizes: Joi.array().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required(),
})

export const dynamic = "force-dynamic"
export async function POST(req) {

    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        console.log('auhuseraddproduct=====',isAuthUser);
        if (isAuthUser?.role === 'admin') {
            const extractData = await req.json();
            const { name, description, price, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl } = extractData;
            const { error } = AddProductSchema.validate({ name, description, price, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl });
            if (error) {
                // console.log(error);
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                })
            }
            const createNewProduct = await Product.create(extractData);

            if (createNewProduct) {
                return NextResponse.json({
                    success: true,
                    message: "product added successfully"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "failed to add product"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not authorized "
            })
        }
    } catch (error) {
        console.log("error while creating product", error.message);
        return NextResponse.json({
            success: false,
            message: "something went wrong"
        })
    }
}