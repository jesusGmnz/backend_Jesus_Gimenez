import fs from "fs"

export default class ProductManager {
    #id = 1; //* Atributo privado
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async getProducts(limit){
        try {
            // Leer el archivo de productos
            const data = await fs.promises.readFile(this.path, 'utf-8');

            // Convertir el contenido del archivo JSON a un array de productos
            const products = JSON.parse(data);
            const productsLimit = products.slice(0,parseInt(limit))
            return productsLimit
        } catch (error) {
            console.error("Error al leer los productos", error);
            return [];
        }
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        try {
            const codeExists = this.products.some(product => product.code === code);
            if (codeExists) {
                throw new Error(`Producto con el code '${code}' ya existe.`)
            }
            
            const newProduct = {
                id: this.#id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };

            this.products.push(newProduct);

            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));

        } catch (error) {
            console.error("Error no se pudo agregar el producto", error);
        }
    }

    async getProductByID(id){
        try {
            // Leer el archivo de productos
            const data = await fs.promises.readFile(this.path, 'utf-8');

            // Convertir el contenido del archivo JSON a un array de productos
            const products = JSON.parse(data);

            // Buscar el producto por ID
            const product = products.find(prod => prod.id === id);
            return product;
        } catch (error) {
            console.error(`Error al buscar el producto con ID ${id}`, error);
            return null;
        }
    }

    async updateProduct(id, update){
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            let products = JSON.parse(data);

            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...update };
                await fs.writeFile(this.path, JSON.stringify(products, null, "\t"));
                return true;
            } else {
                console.error(`No se encontró el producto con ID ${id}`);
                return false;
            }
        } catch (error) {
            console.error(`Error al actualizar el producto con ID ${id}`, error);
            return false;
        }
    }

    async deleteProduct(id){
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            let products = JSON.parse(data);

            // Filtrar los productos para excluir el que tenga el ID proporcionado
            products = products.filter(product => product.id !== id);

            // Escribir los productos actualizados en el archivo JSON (sin el producto eliminado)
            await fs.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return true;
        } catch (error) {
            console.error(`Error al eliminar el producto con ID ${id}`, error);
            return false;
        }
    }

    
}

