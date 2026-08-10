const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'La categoria es obligatoria'],
    enum: {
      values: ['periferico', 'consola', 'laptop', 'audio', 'streaming'],
      message: 'Categoria no valida: {VALUE}'
    }
  },
  brand: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio'],
    min: [0, 'El stock no puede ser negativo'],
    validate: {
      validator: Number.isInteger,
      message: 'El stock debe ser un numero entero'
    }
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  status: {
    type: String,
    enum: {
      values: ['available', 'loaned', 'maintenance', 'inactive'],
      message: 'Estado no valido: {VALUE}'
    },
    default: 'available'
  },
  tags: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Product', productSchema);