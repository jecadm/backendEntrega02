const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        // El archivo no existe, no hay problema
        this.products = [];
      } else {
        // Error al leer el archivo
        console.error(`Error al cargar los productos: ${err}`);
      }
    }
  }

  async saveProducts() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    } catch (err) {
      console.error(`Error al guardar los productos: ${err}`);
    }
  }

  async getProducts() {
    if (this.products.length === 0) {
      await this.loadProducts();
    }
    return this.products;
  }

  async getProductById(id) {
    if (this.products.length === 0) {
      await this.loadProducts();
    }
    return this.products.find(product => product.id === id);
  }

  async addProduct(productData) {
    if (!productData.name || !productData.price || !productData.description) {
      throw new Error('El nombre, el precio y la descripción son obligatorios');
    }

    const lastProduct = this.products[this.products.length - 1];
    const newProduct = {
      id: lastProduct ? lastProduct.id + 1 : 1,
      ...productData,
    };
    this.products.push(newProduct);
    await this.saveProducts();
    return newProduct;
  }

  async updateProduct(id, newProductData) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    if (!newProductData.name || !newProductData.price || !newProductData.description) {
      throw new Error('El nombre, el precio y la descripción son obligatorios');
    }

    const updatedProduct = { ...this.products[productIndex], ...newProductData, id };
    this.products[productIndex] = updatedProduct;
    await this.saveProducts();
    return updatedProduct;
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
    this.products.splice(productIndex, 1);
    await this.saveProducts();
  }
}

module.exports = ProductManager;

const prom = new ProductManager("./db.json");

prom.getProducts()
.then((products) => {
  console.log(products)});
