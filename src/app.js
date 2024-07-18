import express from "express";
import ProductManager from "./ProductManager.js";

const PM = new ProductManager("src/myFile/Products.json")

const app = express();
const PORT = 8080;

app.get("/api/products", async (req,res)=>{
    let products = await PM.getProduct();

    const {limit} = req.query;

    if (limit) {
        products = products.slice(2, limit);
    }

    res.send(products)
})

app.get("/api/products/:pid", async (req,res)=>{
    const pid = req.params.pid;

    let product = await PM.getProductById(pid);

    product ? res.send(product) : console.error("producto no encontrado");

})

app.listen(PORT,()=>{
    console.log(`Servidor activo en http://localhost:${PORT}`);
    console.log(`\t http://localhost:${PORT}/api/products`);
})