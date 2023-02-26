import express from "express";
import * as mongoose from "mongoose";
import bodyParser from "body-parser";
import customerRouter from "./src/router/customer.router";
const app = express();
app.use(bodyParser.json());
app.set('view engine','ejs')
app.set('views','./src/views')
const DB_URL ='mongodb://127.0.0.1:27017/dbTest';
mongoose.connect(DB_URL).then(()=>{
    console.log("Connect DB success")
}).catch(err=>{
    console.log(err.message)
});
app.use('/customer',customerRouter)
app.listen(5000,()=>{
    console.log('http://localhost:5000/create')
})