import mongoose from 'mongoose'


const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    category: String,
    sizes: Array,
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,

}, { timestamps: true })


export const Product = mongoose.models.Products || mongoose.model("Products", ProductSchema)