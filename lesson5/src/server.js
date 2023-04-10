import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors'

import productRouter from './routes/product.js'
import imageRouter from './routes/image.js'
import crawlRouter from './routes/crawl.js';
import brandRouter from './routes/brand.js';
const app = express()

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// Middleware
// CORS
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json())

// Logger
app.use(morgan("combined"))

// Static file
app.use(express.static(path.join(__dirname, "public")))

// Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log("Connect to db successfully"));


// Router
app.use('/api', productRouter)
app.use('/api', brandRouter)
app.use('/api', imageRouter)
app.use('/crawl', crawlRouter)

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})

// export const viteNodeApp = app;