import ProductManager from "../Dao/controllers/ProductsManagerMongo.js";
import { __dirname } from "../utils.js";

const PM = new ProductManager();

const socketProducts = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log("client connected con ID:", socket.id)
        const listadeproductos = await PM.getProductsView()

        socketServer.emit("enviodeproducts", listadeproductos)

        socket.on("addProduct", async (obj) => {
            await PM.addProduct(obj)
            const listadeproductos = await PM.getProductsView()
            socketServer.emit("enviodeproducts", listadeproductos)
        })

        socket.on("deleteProduct", async (id) => {

            await PM.deleteProduct(id)
            const listadeproductos = await PM.getProductsView()
            socketServer.emit("enviodeproducts", listadeproductos)
        })

    })
};

export default socketProducts;