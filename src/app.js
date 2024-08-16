import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io"
import routerP from "./routes/products.router.js";
import routerC from "./routes/carts.router.js"
import routerV from "./routes/views.router.js";
import socketProducts from "./listeners/socketProducts.js";

const app = express();
const PORT = 8080

app.use(express.static(__dirname + "/public"))

app.engine("handlebars",handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine","handlebars")

app.use(express.json())
app.use(express.urlencoded({ extended:true}))

app.use("/api/products",routerP)
app.use("/api/carts",routerC)
app.use('/', routerV);

const httpServer = app.listen(PORT, ()=>{
    try {
        console.log(`server listening on port ${PORT}`);
        console.log(`\t 1.http://localhost:${PORT}/api/products`);
        console.log(`\t 1.http://localhost:${PORT}/api/carts`);
    } catch (err) {
        console.log(err);
    }
});

const socketServer = new Server(httpServer)

socketProducts(socketServer)