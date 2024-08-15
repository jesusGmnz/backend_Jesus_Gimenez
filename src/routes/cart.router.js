import { Router } from "express"
import CartManager from "../cartManager.js"
import { __dirname } from "../utils.js"
const cm = new CartManager(__dirname + "/myfile/carts.json")
const router = Router()

router.get("/", async (req, res) => {
    const carrito = await cm.getCarts()
    res.json({ carrito })
})

router.get("/:cid", async (req, res) => {
    const carritofound = await cm.getCartbyId(req.params)
    res.json({ status: "success", carritofound })
})


router.post("/", async (req, res) => {
    const newcart = await cm.addCart();
    res.json({ status: "success", newcart });
});

router.post("/:cid/products/:pid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);

        await cm.addProductToCart(cid, pid);
        res.json({ status: "success", message: "Product added to cart successfully." });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ status: "error", message: "Failed to add product to cart." });
    }
});


export default router