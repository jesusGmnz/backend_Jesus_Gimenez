const fs = require('fs');

// Creamos la primera clase
class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path
        this.id = 0;
    }

    async getProduct(){
        // Leer el archivo de productos
        const listProducts = await fs.promises.readFile(this.path, 'utf-8');

        // Convertir el contenido del archivo JSON a un array de productos
        const products = JSON.parse(listProducts);
        return products;
    }

    async addProduct({ title, description, price, thumbnail, code, stock }){
        
        // Para agregar los productos debe llenar todo los campos
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
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

        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));

        console.log("Producto agregado con exito", newProduct);
    }

    
    async updateProduct(id, title, description, price, thumbnail, code, stock){
        //para actualizar un producto debe ingresar los todos los datos
        if (!title || !description || !price || !thumbnail || !code || !stock) {
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
                        return product;
                    }
                })
                await fs.promises.writeFile(this.path,JSON.stringify(newListProduct,null,"\t"))
            }
        }
    }

    async deleteProduct(id){
        const data = await this.getProduct();
        const product = data.filter(element => element.id === id)
        await fs.promises.writeFile(yhis.path,JSON.stringify(product,null,"\t"))
    }
    
    async getProductById(id){
        // Metodo para obtener el producto por id
        const product = await this.products.find(product => product.id === id);
    if (!product) {
        console.log('Producto no encontrado.');
    }
    return product;
    }
}

// Instanciamos
const run = async () =>{
    const PM = new ProductManager("products.json");
    
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
    
    PM.addProduct({
        title: "product3",
        description: "description3",
        price: 1000,
        thumbnail: "path",
        code: "code3",
        stock: 10
    });
    
    PM.addProduct({
        title: "product4",
        description: "description4",
        price: 1000,
        thumbnail: "path",
        code: "code4",
        stock: 10
    });
    
    PM.addProduct({
        title: "product5",
        description: "description5",
        price: 1000,
        thumbnail: "path",
        code: "code5",
        stock: 10
    });
    
    PM.addProduct({
        title: "product6",
        description: "description6",
        price: 1000,
        thumbnail: "path",
        code: "code6",
        stock: 10
    });
    
    PM.addProduct({
        title: "product7",
        description: "description7",
        price: 1000,
        thumbnail: "path",
        code: "code7",
        stock: 10
    });
    
    PM.addProduct({
        title: "product8",
        description: "description8",
        price: 1000,
        thumbnail: "path",
        code: "code8",
        stock: 10
    });
    
    PM.addProduct({
        title: "product9",
        description: "description9",
        price: 1000,
        thumbnail: "path",
        code: "code9",
        stock: 10
    });
    
    PM.addProduct({
        title: "product10",
        description: "description10",
        price: 1000,
        thumbnail: "path",
        code: "code10",
        stock: 10
    });
}

run();