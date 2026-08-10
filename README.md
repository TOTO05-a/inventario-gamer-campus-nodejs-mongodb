# Inventario Gamer Campus

Ejercicio de Node.js y MongoDB para Campuslands. CRUD de productos de inventario gamer ejecutado desde consola, sin servidor web ni API.

## Tecnologias

- Node.js 20 o superior
- MongoDB
- Mongoose
- dotenv
- nodemon (solo en desarrollo)

## Instalacion

```
npm install
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta el valor si es necesario:

```
MONGODB_URI=mongodb://localhost:27017/campus_inventory_gamer
```

## Scripts disponibles

- `npm run seed` — inserta los productos iniciales en la base de datos.
- `npm run dev` — ejecuta el proyecto con nodemon (recarga automatica).
- `npm start` — ejecuta el proyecto con node.

## Modelo de datos

| Campo    | Tipo   | Regla                                                          |
|----------|--------|-----------------------------------------------------------------|
| name     | String | Obligatorio, minimo 3 caracteres                                 |
| category | String | periferico, consola, laptop, audio, streaming                    |
| brand    | String | Marca del producto                                                |
| stock    | Number | Entero mayor o igual a 0                                          |
| price    | Number | Mayor o igual a 0                                                 |
| status   | String | available, loaned, maintenance, inactive (por defecto: available) |
| tags     | Array  | Palabras clave: gamer, torneo, clase                              |

## Operaciones CRUD

Todas las operaciones estan en `src/services/product.service.js`.

- `createProduct(data)` — valida y guarda un producto nuevo.
- `listProducts(filters)` — lista productos, con filtros opcionales por `category` y `status`.
- `findProductById(id)` — busca un producto por id, validando que sea un ObjectId valido.
- `updateProduct(id, data)` — actualiza stock, precio, estado u otros datos permitidos.
- `deactivateProduct(id)` — cambia el status a `inactive` sin borrar el producto (borrado logico).
- `deleteProduct(id)` — borrado fisico opcional. Solo debe usarse si el instructor lo autoriza, ya que elimina el producto y su historial de forma permanente.

## Ejecutar el proyecto

```
npm run seed
npm run dev
```

`src/index.js` ejecuta en orden las pruebas del ejercicio (crear, listar, filtrar, buscar, actualizar y desactivar) y muestra los resultados en consola.