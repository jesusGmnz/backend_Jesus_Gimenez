import { Router } from "express";
import ProductManager from "../ProductsManager.js";
import { __dirname } from "../utils.js";


const PM = new ProductManager(__dirname + "/myfile/products.json");
const router = Router();

//RUTAS
router.get("/", async (req, res) => {
    const productlist = await PM.getProducts(req.query)
    res.json(productlist)
})


router.get("/:pid", async (req, res) => {
    const productfound = await PM.getProductbyId(req.params)
    res.json(productfound)
})

// Ruta para agregar un nuevo producto
router.post("/", async (req, res) => {

    try {
        const newproduct = await PM.addProduct(req.body);
        res.status(201).json({ status: "success", newproduct });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

// Ruta para actualizar un producto
router.put("/:pid", async (req, res) => {
    try {
        const updatedproduct = await PM.updateProduct(req.params, req.body);
        res.json({ status: "success", updatedproduct });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

// Ruta para eliminar un producto
router.delete("/:pid", async (req, res) => {
    try {
        const deleteproduct = await PM.deleteProduct(req.params);
        res.json({ status: "success", deleteproduct });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

export default router