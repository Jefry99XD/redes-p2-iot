const express = require('express');
const router = express.Router();
const Location = require('../models/location');

// Ruta para crear una nueva ruta con nombre, origen, destino y username
router.post('/create-route', async (req, res) => {
  const { routeName, origin, destination, username } = req.body;

  // Validación básica
  if (!routeName || !origin || !destination || !username) {
    return res.status(400).json({ error: 'Route name, origin, destination, and username are required' });
  }

  try {
    // Crea una nueva instancia del modelo Location con los datos de la ruta
    const route = new Location({
      routeName,
      origin,
      destination,
      username,
    });
    await route.save();

    res.status(201).json({ message: 'Route created successfully', data: route });
  } catch (error) {
    res.status(500).json({ error: 'Error creating route' });
  }
});

module.exports = router;
