import { Router } from "express";
import ProductManager from "../Dao/controllers/ProductsManager.js";
import { __dirname } from "../utils.js";


const PM = new ProductManager(__dirname + "/database/products.json");
const routerP = Router();

//RUTAS
routerP.get("/",async (req,res) => {
    const products = await PM.getProducts(req.query)
    res.send({products})
})

routerP.get("/:pid", async (req, res) => {
    const productfound = await PM.getProductbyId(req.params)
    res.json(productfound)
})

routerP.post("/", async (req, res) => {

    try {
        const newproduct = await PM.addProduct(req.body);
        res.status(201).json({ status: "success", newproduct });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

routerP.put("/:pid", async (req, res) => {
    try {
        const updatedproduct = await PM.updateProduct(req.params, req.body);
        res.json({ status: "success", updatedproduct });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

routerP.delete("/:pid", async (req, res) => {
    try {
        const deleteproduct = await PM.deleteProduct(req.params);
        res.json({ status: "success", deleteproduct });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

export default routerP