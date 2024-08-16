import fs from "fs"

export default class ProductsManager {
    constructor(path) {
        (this.path = path),
            (this.products = []);
    }

    async getProducts(info) {
        try {
            const { limit } = info;
            if (fs.existsSync(this.path)) {
                const productlist = await fs.promises.readFile(this.path, "utf-8");
                const productlistJs = JSON.parse(productlist);
                if (limit) {
                    const limitProducts = productlistJs.slice(0, parseInt(limit));
                    return limitProducts;
                } else {
                    return productlistJs;
                }
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    async getProductsView() {
        try {
            if (fs.existsSync(this.path)) {
                const productlist = await fs.promises.readFile(this.path, "utf-8");
                const productlistJs = JSON.parse(productlist);
                return productlistJs;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    addProduct = async (obj) => {
        const { title, description, price, thumbnail, category, status = true, code, stock } = obj
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

    async getProductbyId(id) {
        try {
            const { pid } = id
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

    async updateProduct(id, obj) {
        const { pid } = id
        const { title, description, price, category, thumbnail, status, code, stock } = obj
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

    async deleteProduct(id) {
        const allproducts = await this.getProducts({});
        const productswithoutfound = allproducts.filter(
            (elemento) => elemento.id !== parseInt(id)
        );
        await fs.promises.writeFile(this.path, JSON.stringify(productswithoutfound, null, 2)
        );
        return "Producto Eliminado"
    };
}

