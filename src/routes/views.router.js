import { Router } from 'express';
import ProductsManager from '../Dao/controllers/ProductsManager.js';
import { __dirname } from "../utils.js"

const PM = new ProductsManager(__dirname+'/database/products.json')
const routerV = Router()

routerV.get("/",async(req,res)=>{
    const listadeproductos=await PM.getProductsView()
    res.render("home",{listadeproductos})
})

routerV.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts")
})

export default routerV