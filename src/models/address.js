
import mongoose from "mongoose"

const AddressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }
}, { timeStamps: true })

export const Address = mongoose.models.Address || mongoose.model("Address", AddressSchema)