const mongoose = require('mongoose');
const connectDB = require('./config/database');
const {
  createProduct,
  listProducts,
  findProductById,
  updateProduct,
  deactivateProduct
} = require('./services/product.service');

async function run() {
  await connectDB();

  console.log('\n--- Crear producto valido ---');
  try {
    const newProduct = await createProduct({
      name: 'Silla gamer ProSeat',
      category: 'periferico',
      brand: 'DXRacer',
      stock: 5,
      price: 2200.00,
      status: 'available',
      tags: ['gamer', 'clase']
    });
    console.log('Producto creado:', newProduct.name);
  } catch (error) {
    console.error('Error al crear producto:', error.message);
  }

  console.log('\n--- Crear producto sin name (debe fallar) ---');
  try {
    await createProduct({
      category: 'periferico',
      stock: 5,
      price: 100
    });
  } catch (error) {
    console.error('Error esperado:', error.message);
  }

  console.log('\n--- Crear producto con stock negativo (debe fallar) ---');
  try {
    await createProduct({
      name: 'Producto con error',
      category: 'periferico',
      stock: -5,
      price: 100
    });
  } catch (error) {
    console.error('Error esperado:', error.message);
  }

  console.log('\n--- Listar todos los productos ---');
  const allProducts = await listProducts();
  console.table(allProducts.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    category: p.category,
    status: p.status,
    stock: p.stock,
    price: p.price
  })));

  console.log('\n--- Filtrar por category=periferico y status=available ---');
  const filtered = await listProducts({ category: 'periferico', status: 'available' });
  console.table(filtered.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    category: p.category,
    status: p.status
  })));

  let targetId = null;

  console.log('\n--- Buscar producto por id ---');
  try {
    if (allProducts.length > 0) {
      targetId = allProducts[0]._id.toString();
      const found = await findProductById(targetId);
      console.log('Producto encontrado:', found.name);
    }
  } catch (error) {
    console.error('Error al buscar producto:', error.message);
  }

  console.log('\n--- Actualizar stock y precio ---');
  try {
    if (targetId) {
      const updated = await updateProduct(targetId, { stock: 30, price: 500.00 });
      console.log('Producto actualizado:', updated.name, '- stock:', updated.stock, '- price:', updated.price);
    }
  } catch (error) {
    console.error('Error al actualizar producto:', error.message);
  }

  console.log('\n--- Desactivar producto ---');
  try {
    if (targetId) {
      const deactivated = await deactivateProduct(targetId);
      console.log('Producto desactivado, status actual:', deactivated.status);
    }
  } catch (error) {
    console.error('Error al desactivar producto:', error.message);
  }

  await mongoose.connection.close();
  console.log('\nConexion cerrada');
}

run();