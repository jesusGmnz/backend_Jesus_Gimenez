import express from "express";
import ProductManager from "./ProductsManager.js";


const PM = new ProductManager("./src/myfile/products.json");
const app = express();
const PORT = 8080

app.get("/api/products", async(req,res)=>{
    const{limit} = req.query
    const productsList = await PM.getProducts(limit)
    res.send(productsList)
})

app.get("/api/products/:pid",async(req,res)=>{
    console.log(req.params);
    const {pid} = req.params
    const productId = await PM.getProductByID(parseInt(pid))
    res.send(productId)
})

app.listen(PORT, ()=>{
    try {
        console.log(`server listening on port ${PORT}`);
        console.log(`\t 1.http://localhost:${PORT}/api/products`);
        console.log(`\t 1.http://localhost:${PORT}/api/carts`);
    } catch (err) {
        console.log(err);
    }
    
})