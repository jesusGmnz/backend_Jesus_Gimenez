// Creamos la primera clase
class ProductManager{
    constructor(){
        this.products = [];
        this.id = 0;
    }

    getProduct(){
        return this.products
    }

    addProduct({ title, description, price, thumbnail, code, stock }){
        
        // Para agregar los productos debe llenar todo los campos
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }

        // Verificar que el código del producto no exista ya
        const existingProduct = this.products.find(
            (product) => product.code === code
        );
        if (existingProduct) {
            console.log(`El producto con el código ${code} ya existe.`);
            return;
        }

        // Agregar un nuevo producto
        const newProduct = {
            id: this.id++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        // metodo para agregar el producto
        this.products.push(newProduct);
        console.log("Producto agregado con exito", newProduct);
    }

    getProductById(id){
        // Metodo para obtener el producto por id
        const product = this.products.find(product => product.id === id);
    if (!product) {
        console.log('Producto no encontrado.');
    }
    return product;
    }
}

// Instanciamos
const PM = new ProductManager();

PM.addProduct({
    title: "product1",
    description: "description1",
    price: 1000,
    thumbnail: "path",
    code: "code1",
    stock: 10
});

PM.addProduct({
    title: "product2",
    description: "description2",
    price: 1000,
    thumbnail: "path",
    code: "code2",
    stock: 10
});

console.log(PM.getProduct);
console.log(PM.getProduct);