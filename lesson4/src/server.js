import bodyParser from "body-parser";
import express  from "express";
import mongoose from "mongoose";
import productRouter from "./routers/product";

const app = express()
const port = 8000
// middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
// parse application/json
app.use(bodyParser.json())

// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/we17317")
.then(()=> console.log("connect successfully"))

// Router
app.use('/api', productRouter)

app.listen(port, function(){
    console.log(`server is running on port 8000`);
})