import ProductsManager from "../Dao/controllers/ProductsManager.js";
import { __dirname } from "../utils.js";
const pm = new ProductsManager(__dirname + '/database/products.json')

const socketProducts = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log("client connected con ID:", socket.id)
        const listadeproductos = await pm.getProductsView()

        socketServer.emit("enviodeproducts", listadeproductos)

        socket.on("addProduct", async (obj) => {
            await pm.addProduct(obj)
            const listadeproductos = await pm.getProductsView()
            socketServer.emit("enviodeproducts", listadeproductos)
        })

        socket.on("deleteProduct", async (id) => {

            await pm.deleteProduct(id)
            const listadeproductos = await pm.getProductsView()
            socketServer.emit("enviodeproducts", listadeproductos)
        })

    })
};

export default socketProducts;