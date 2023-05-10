class ProductManager {
    constructor() {
      // Inicializa un arreglo vacío de productos y el id actual en 0
      this.products = [];
      this.currentId = 0;
      this.patch = patch
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validación para asegurarse de que se hayan proporcionado todos los campos obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Todos los campos son obligatorios, All fields are required.');
        return;
      }
  
      // Validación para asegurarse de que no exista un producto con el mismo código
      if (this.products.some((product) => product.code === code)) {
        console.error('Producto con el mismo codigo.');
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
      

      console.log('Producto agredado correctamente .');

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
        console.error('Product not found.');
      }
  
      // Devuelve el producto encontrado (o undefined si no se encontró)
      return product;
    }
    
  }
  
  // Crea una instancia de ProductManager
  const prom = new ProductManager();
  
  // Agrega dos productos a la instancia de ProductManager
  prom.addProduct('Asado', 'Descripcion: con cuero ancho', 200.000, 'https://elasado.ar/product1.jpg', 'Pas02', 24);
  prom.addProduct('Chuchulin', 'Descripcion:  con mucha grasa', 500, 'https://elasado.ar/product2.jpg', 'chin2', 10);
  
  // Muestra todos los productos y un producto por id en la consola
  console.log(prom.getProducts());
  console.log(prom.getProductById(1));
  console.log(prom.getProductById(3));

