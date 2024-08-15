import express from "express";
import router from "./routes/product.router.js";

const app = express();
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended:true}))

app.use("/api/products",router)
app.use("/api/carts",router)

app.listen(PORT, ()=>{
    try {
        console.log(`server listening on port ${PORT}`);
        console.log(`\t 1.http://localhost:${PORT}/api/products`);
        console.log(`\t 1.http://localhost:${PORT}/api/carts`);
    } catch (err) {
        console.log(err);
    }
    
})