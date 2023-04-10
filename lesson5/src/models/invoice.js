import { number } from "joi";
import { Schema } from "mongoose";

const Invoice = new Schema({
    ngaymua: {
        type: Date,
        default: Date.now
    },
    good: {
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    userId: {
        type: Schema.ObjectId
    }
})