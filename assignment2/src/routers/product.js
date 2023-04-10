import express from "express"
import { create, get, getById, remove, update } from "../controllers/product"

const productRouter = express.Router()

productRouter.get('/product', get)
productRouter.get('/products/:id', getById)
productRouter.post('/products', create)
productRouter.put('/products/:id', update)
productRouter.delete('/product/:id', remove)

export default productRouter