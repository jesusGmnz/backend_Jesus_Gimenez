import fs from "fs"

export default class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async getProducts(objectquery) {
        const { limit } = objectquery;
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                const productList = JSON.parse(products);
                if (limit) {
                    const limitProducts = productList.slice(0, parseInt(limit));
                    return limitProducts;
                } else {
                    return productList;
                }
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    addProduct = async (objbody) => {
        const { title, description, price, thumbnail, category, status = true, code, stock } = objbody
        if (!title || !description || !price || !category || !code || !status || !stock) {
            console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO");
            return;
        } else {
            const products = await this.getProducts({})
            const codeExist = products.find(
                (product) => product.code === code
            );
            if (codeExist) {
                console.error("EL CODIGO DEL PRODUCTO QUE DESEA AGREGAR ES REPETIDO");
                return;
            } else {
                const id = await this.generateId();
                const productnew = {
                    id,
                    title,
                    description,
                    price,
                    category,
                    status,
                    thumbnail,
                    code,
                    stock,
                };
                products.push(productnew);
                await fs.promises.writeFile(this.path,
                    JSON.stringify(products, null, 2)
                );
            }
        }
    };

    async getProductbyId(objectparams) {
        const { pid } = objectparams
        try {
            if (fs.existsSync(this.path)) {
                const products = await this.getProducts({});
                const found = products.find((product) => product.id === parseInt(pid));
                if (found) {
                    return found;
                } else {
                    throw new Error("Producto no existe");
                }
            } else {
                throw new Error("Product file not found");
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    async generateId() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                const productList = JSON.parse(products);
                const counter = productList.length;
                if (counter == 0) {
                    return 1;
                } else {
                    return productList[counter - 1].id + 1;
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    async updateProduct(objparams, objbody){
        const { pid } = objparams
        const { title, description, price, category, thumbnail, status, code, stock } = objbody
        if (title === undefined || description === undefined || price === undefined || category === undefined || status === undefined || code === undefined || stock === undefined) {
            console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO PARA SU ACTUALIZACION");
            return;
        } else {
            const products = await this.getProducts({});
            const codeExist = products.find((i) => i.code === code);
            if (codeExist) {
                console.error(
                    "EL CODIGO DEL PRODUCTO QUE DESEA ACTUALIZAR ES REPETIDO"
                );
                return;
            } else {
                const products = await this.getProducts({});
                const newProductsList = products.map((elemento) => {
                    if (elemento.id === parseInt(pid)) {
                        const updatedProduct = {
                            ...elemento,
                            title,
                            description,
                            price,
                            category,
                            status,
                            thumbnail,
                            code,
                            stock
                        };
                        return updatedProduct;
                    } else {
                        return elemento;
                    }
                });
                await fs.promises.writeFile(this.path, JSON.stringify(newProductsList, null, 2));

            }
        }
    };

    async deleteProduct(objparams){
        const { pid } = objparams
        const products = await this.getProducts({});
        const productFound = products.filter(
            (elemento) => elemento.id !== parseInt(pid)
        );
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(productFound, null, 2)
        );
    };
}

