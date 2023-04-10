import Product from "../models/product";
import Joi from 'joi'

const Image = Joi.object({
    base_url: Joi.string().required(),
    is_gallery: Joi.boolean().required(),
    label: Joi.any(),
    large_url: Joi.string().required(),
    medium_url: Joi.string().required(),
    position: Joi.any(),
    small_url: Joi.string().required(),
    thumbnail_url: Joi.string().required(),

})


const Specification = Joi.object({
    name: Joi.string().required(),
    attributes: Joi.array().items(Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        value: Joi.string().required(),
    })).min(1).required()
})



const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    original_price: Joi.number().required(),
    description: Joi.string(),
    specifications: Joi.array().items(Specification).min(1).required(),
    brand: Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        slug: Joi.string().required(),
    }).required()
})

export const get = async (req, res) => {
    try {
        const data = await Product.find()
        res.send({
            message: "Get products successfully",
            data: data
        })
    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}

export const getById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Product.findById(id)
        res.send({
            message: "Get products successfully",
            data: data
        })
    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}

export const create = async (req, res) => {
    try {
        const body = req.body
        const { error } = productSchema.validate(body)
        if (error) {
            res.status(400).send({
                message: error.message,
            })
        } else {
            const data = await Product.create(body)
            res.send({
                message: "Create successfully",
                data: data
            })
        }

    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const { error } = productSchema.validate(body)
        if (error) {
            res.status(400).send({
                message: error.message,
            })
        } else {
            const data = await Product.findByIdAndUpdate(id, body)
            if (data) {
                res.send({
                    message: "Update successfully",
                    data: data
                })
            } else {
                res.status(400).send({
                    message: "Product is not existed"
                })
            }
        }
    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Product.findByIdAndRemove(id)
        if (data) {
            res.send({
                message: "Delete successfully",
                data: data
            })
        } else {
            res.status(400).send({
                message: "Product is not existed"
            })
        }

    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}