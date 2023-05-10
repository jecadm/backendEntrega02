const fs = require('fs');

class ProductManager {
  constructor(path) {
    // Inicializa un arreglo vacío de productos, el id actual en 0 y la ruta del archivo a trabajar
    this.products = [];
    this.currentId = 0;
    this.path = path;

    // Carga los productos del archivo si existe
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      this.currentId = this.products[this.products.length - 1].id;
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validación para asegurarse de que se hayan proporcionado todos los campos obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('Todos los campos son obligatorios, All fields are required.');
      return;
    }

    // Validación para asegurarse de que no exista un producto con el mismo código
    if (this.products.some((product) => product.code === code)) {
      console.error('Product  existe.');
      return;
    }

    // Crea un nuevo producto con un id autoincrementable
    const newProduct = {
      id: ++this.currentId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    // Agrega el nuevo producto al arreglo de productos
    this.products.push(newProduct);
    console.log(`Product agregado ok NAME: ${newProduct.title} ID: ${newProduct.id} Precio: ${newProduct.price}.`);

    // Guarda los productos en el archivo
    this.saveProducts();
  }

  getProducts() {
    // Devuelve el arreglo completo de productos
    return this.products;
  }

  getProductById(id) {
    // Busca un producto por id en el arreglo de productos
    const product = this.products.find((product) => product.id === id);

    // Si no se encontró un producto con el id proporcionado, muestra un mensaje de error en la consola
    if (!product) {
      console.error('Product no encontrado.');
    }

    // Devuelve el producto encontrado (o undefined si no se encontró)
    return product;
  }

  updateProduct(id, newProductData) {
    // Busca el índice del producto a actualizar
    const productIndex = this.products.findIndex((product) => product.id === id);

    // Si no se encontró un producto con el id proporcionado, muestra un mensaje de error en la consola
    if (productIndex === -1) {
      console.error('Product no encontrado.');
      return;
    }

    // Actualiza los datos del producto
    this.products[productIndex] = { ...this.products[productIndex], ...newProductData };
    console.log('Product actualizado correctamente.');

    // Guarda los productos en el archivo
    this.saveProducts();
  }

  deleteProduct(id) {
    // Busca el índice del producto a eliminar
    const productIndex = this.products.findIndex((product) => product.id === id);

    // Si no se encontró un producto con el id proporcionado, muestra un mensaje de error en la consola
    if (productIndex === -1) {
      console.error('Product no encontrado.');
      return;
    }

    // Elimina el producto del arreglo de productos
    this.products.splice(productIndex, 1);
    console.log('Product borrado ok.');

    // Guarda los productos en el archivo
    this.saveProducts();
  }

  saveProducts() {
    // Guarda los productos
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));}}

// Crea una instancia de ProductManager
 const prom = new ProductManager('./db.json'); 
  
// Agrega dos productos a la instancia de ProductManager
 prom.addProduct('Asado', 'Descripcion: con cuero ancho', 200.000, 'https://elasado.ar/product1.jpg', 'Pas02', 24);
prom.addProduct('Chuchulin', 'Descripcion:  con mucha grasa', 500, 'https://elasado.ar/product2.jpg', 'chin2', 10);
prom.addProduct('ChuchulinPremium', 'Descripcion:  con mucha mas grasa', 5500, 'https://elasado.ar/product2.jpg', 'chin6', 52); 
// Muestra todos los productos y un producto por id en la consola
console.log(prom.getProducts());
/* console.log(prom.getProductById(1));
console.log(prom.getProductById(3)); */
/* ProductManager.updateProduct(1, {price:'150'}); */
/* console.log(prom.getProductById(1)) */