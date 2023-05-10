const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.products = [];
    this.currentId = 0;
    this.path = path;
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      let products = [];

      if (data.length > 1) {
        products = JSON.parse(data);
      }

      this.products = products;

      return this.products;
    } catch (err) {
      console.error(`Error ${err}`);
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      const products = JSON.parse(data);

      const product = products.find((product) => product.id === id);

      if (!product) {
        console.error('Product not found.');
      }

      return product;
    } catch (err) {
      console.error(`Error ${err}`);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('All fields are required.');
      return;
    }

    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      const products = JSON.parse(data);

      if (products.some((product) => product.code === code)) {
        console.error('Product with the same code already exists.');
        return;
      }

      const newProduct = {
        id: ++this.currentId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      products.push(newProduct);

      await fs.promises.writeFile(this.path, JSON.stringify(products));

      console.log('Product added successfully.');
    } catch (err) {
      console.error(`Error ${err}`);
    }
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('All fields are required.');
      return;
    }

    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      const products = JSON.parse(data);

      const index = products.findIndex((product) => product.id === id);

      if (index === -1) {
        console.error('Product not found.');
        return;
      }

      if (products.some((product) => product.code === code && product.id !== id)) {
        console.error('Product with the same code already exists.');
        return;
      }

      const updatedProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      products[index] = updatedProduct;

      await fs.promises.writeFile(this.path, JSON.stringify(products));

      console.log('Product updated successfully.');
    } catch (err) {
      console.error(`Error ${err}`);
    }
  }

  async deleteProduct(id) {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      const products = JSON.parse(data);

      const index = products.findIndex((product) => product.id === id);

      if (index === -1) {
        console.error('Product not found.');
        return;
      }

      products.splice(index, 1);

      await fs.promises.writeFile(this.path, JSON.stringify(products));

      console.log('Product deleted successfully.');
    } catch (err) {
      console.error(`Error ${err}`);
    }
}
}



const prom = new ProductManager("./db.json");

prom.getProducts()
.then((products) => {
  console.log(products)});
