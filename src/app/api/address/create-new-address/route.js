import { connectToDB } from "@/database"
import { AuthUser } from "@/middleware/AuthUser";
import { NextResponse } from "next/server";
import Joi from "joi";
import { Address } from "@/models/address";


const addressSchema = Joi.object({
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
    userId: Joi.string().required()
})
const dynamic = 'force-dynamic'
export async function POST(req) {
    try {
        await connectToDB();

        const isAuthUser = await AuthUser(req);
        // console.log('authuser',isAuthUser)
        if (isAuthUser) {
            const extractData = await req.json();
            const { fullName, address, city, country, postalCode, userId } = extractData;
            const { error } = addressSchema.validate({ fullName, address, city, country, postalCode, userId })
            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message
                })
            }
            const newAdress = await Address.create(extractData);
            // console.log(newAdress)
            if (newAdress) {
                return NextResponse.json({
                    success: true,
                    message: "address created successfully"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "failed to create address"
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
            message: "something went wrong ! please try again later"
        })
    }
}