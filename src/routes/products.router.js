import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../Dao/controllers/ProductsManagerMongo.js"


const PM = new ProductManager()

const routerP = Router()

routerP.get("/products", async (req, res) => {
    const products = await PM.getProducts(req.query)
    res.json({ products })
})



routerP.get("/products/:pid", async (req, res) => {
    const productfind = await PM.getProductbyId(req.params);
    res.json({ status: "success", productfind });
});

routerP.post("/products", async (req, res) => {
    const newproduct = await PM.addProduct(req.body);
    res.json({ status: "success", newproduct });
});

routerP.put("/products/:pid", async (req, res) => {
    const updatedproduct = await PM.updateProduct(req.params, req.body);
    res.json({ status: "success", updatedproduct });
});


routerP.delete("/products/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const deleteproduct = await PM.deleteProduct(id);
    res.json({ status: "success", deleteproduct });
});

export default routerP