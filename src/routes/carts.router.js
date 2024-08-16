import { Router } from "express"
import CartsManager from "../Dao/controllers/cartsManager.js"
import { __dirname } from "../utils.js"


const CM = new CartsManager(__dirname + "/Dao/controllers/carstManager.js")
const routerC = Router()

routerC.get("/", async (req, res) => {
    const carrito = await CM.getCarts()
    res.json({ carrito })
})

routerC.get("/:cid", async (req, res) => {
    const carritofound = await CM.getCartbyId(req.params)
    res.json({ status: "success", carritofound })
})


routerC.post("/", async (req, res) => {
    const newcart = await CM.addCart();
    res.json({ status: "success", newcart });
});

routerC.post("/:cid/products/:pid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);

        await CM.addProductToCart(cid, pid);
        res.json({ status: "success", message: "Product added to cart successfully." });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ status: "error", message: "Failed to add product to cart." });
    }
});

export default routerC