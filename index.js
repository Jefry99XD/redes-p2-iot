require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Importa las rutas
const locationRoutes = require('./routes/location');
app.use('/api/location', locationRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
