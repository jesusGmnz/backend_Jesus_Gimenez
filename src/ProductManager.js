import fs from "fs";

// Creamos la primera clase
class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path;
        this.id = 0;
    }

    async getProduct(){
        try {
            // Leer el archivo de productos
            const data = await fs.promises.readFile(this.path, 'utf-8');

            // Convertir el contenido del archivo JSON a un array de productos
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            console.error("Error a buscar los productos", error);
            return [];
        }
    }

    async addProduct({ title, description, price, thumbnail, code, stock }){

        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.error("Todos los campos son obligatorios.");
                return;
            }
            const existingProduct = this.products.find((product) => product.code === code);
            if (existingProduct) {
                console.log(`El producto con el código ${code} ya existe.`);
                return;
            }

            const newProduct = {
                id: this.id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
            this.products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
            console.log("Producto agregado con exito", newProduct);
        } catch (error) {
            console.error("Error al agregar un nuevo producto", error.message);
            throw error;
        }
        
    }

    async updateProduct(id, title, description, price, thumbnail, code, stock){
        try {
            if (!id || !title || !description || !price || !thumbnail || !code || !stock) {
                console.error("Todos los campos son obligatorios.");
                return;
            }
            else{
                const data = await this.getProduct();
                const existingProduct = data.find((element) => element.code === code);
                if(existingProduct){
                    console.error(`El producto con el código ${code} ya existe.`);
                    return;
                }
                else{
                    const listProduct = await this.getProduct();
                    const newListProduct = listProduct.map((element) =>{
                        if (element.id===id){
                            const updateProduct = {
                                ...element,
                                title,description,price,thumbnail,code,stock
                            }
                            return updateProduct
                        }
                        else{
                            return products;
                        }
                    })
                    await fs.promises.writeFile(this.path,JSON.stringify(newListProduct,null,"\t"))
                }
            }
        } catch (error) {
            console.error("Error al actualizar producto", error.message);
            throw error;
        }
    }

    async deleteProduct(id){
        try {
            const data = await this.getProduct();
            const product = data.filter(element => element.id === id)
            await fs.promises.writeFile(this.path,JSON.stringify(product,null,"\t"))
        } catch (error) {
            console.error("Error al eliminar producto", error.message);
            throw error;
        }
    }
    
    async getProductById(id){
        try {
            // Leer el archivo de productos
            const data = await fs.promises.readFile(this.path, 'utf-8');
            // Convertir el contenido del archivo JSON a un array de productos
            const products = JSON.parse(data);
            // Metodo para obtener el producto por id
            const product = products.find(prod => prod.id == id);
            return product;
            
        } catch (error) {
            console.error(`Error no se encontro producto con ID ${id}`, error);
            throw error;
        }
    }
}

export default ProductManager;