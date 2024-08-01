
class ProductManager {
    #id = 1; //* Atributo privado
    constructor() {
        this.products = [];
    }

    getProducts() {
        //? Obtiene todos productos
        return this.products
    }

    addProduct( title, description, price, thumbnail, code, stock ) {
        //! Revisa que se han ingresado todos los datos
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }
        //! Revisa que el código del producto no exista ya
        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
            console.log(`El producto con el código ${code} ya existe.`);
            return;
        }
        //? Creamos un nuevo producto
        const newProduct = {
            id: this.#id++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        //! Se agrega el producto
        this.products.push(newProduct);
        console.log("Producto agregado con exito:", newProduct);
    }

    getProductById(id){
        const product = this.products.find(product => product.id == id);
        if (!product) {
            console.error('Producto no encontrado.');
            return
        }
        else{
            return product;
        }
    }
}

const PM = new ProductManager();

PM.addProduct("product1", "decription1", 1000, "url", "code1", 100)
PM.addProduct("product3", "decription2", 1000, "url", "code2", 100)
PM.addProduct("product4", "decription3", 1000, "url", "code3", 100)
PM.addProduct("product5", "decription4", 1000, "url", "code4", 100)

console.log(PM.getProducts());
console.log(PM.getProductById(4));