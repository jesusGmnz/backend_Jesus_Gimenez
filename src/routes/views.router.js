import { Router } from 'express';
import ProductManager from '../Dao/controllers/ProductsManagerMongo.js';
import { __dirname } from "../utils.js"

const PM =new ProductManager()
const routerV = Router()


routerV.get("/",async(req,res)=>{
    const listadeproductos=await PM.getProductsView()
    res.render("home",{listadeproductos})
})

routerV.get("/realtimeproducts",(req,res)=>{
res.render("realtimeproducts")
})

routerV.get("/chat",(req,res)=>{
    res.render("chat")
})

export default routerV