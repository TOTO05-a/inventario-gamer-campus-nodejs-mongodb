require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conexion a MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
    throw error;
  }
}

module.exports = connectDB;