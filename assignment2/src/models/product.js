import mongoose from "mongoose";
const {Schema} = mongoose

const Attributes = new Schema(
    {
        code: {
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        value:{
            type: String,
            required: true
        }
    })
const Specifications = new Schema({
    name:{
        type: String,
        required: true
    },
    attributes: {
        type: [Attributes],
        required: true
    }

})
const Product = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    original_price: {
        type: Number,
        require: true
    },
    description: {
        type: String
    },
    images: {
        base_url: {
            type: String,
        },
        is_gallery: {
            type: Boolean
        },
        large_url: {
            type: String,
        },
        medium_url: {
            type: String,
        },
        small_url: {
            type: String,
        },
        thumbnail_url: {
            type: String,
        },
    },
    brand: {
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
    },
    specifications: {
        type: [Specifications],
        required: true
    },
})

export default mongoose.model("Product", Product)