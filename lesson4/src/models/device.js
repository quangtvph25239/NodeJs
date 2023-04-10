import mongoose from "mongoose";

const {Schema} = mongoose

const Image = new Schema({
    base_url: {
        type: String,
        required: true
    },
    is_gallery: Boolean,
    label: String,
    large_url: {
        type: String,
        required: true
    },
    medium_url: {
        type: String,
        required: true
    },
    position: String,
    small_url: {
        type: String,
        required: true
    },
    thumbnail_url: {
        type: String,
        required: true
    },
})

const Device = new Schema({
    name: {
        type: String,
        required: true
    },
    price: Number,
    original_price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [Image],
        required: true
    },
    brand:{
        id: {
            type: Number,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        slug: {
            type: String,
            require: true
        }
    }
})

export default mongoose.model("device", Device)