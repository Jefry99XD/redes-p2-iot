const Location = require('../models/location');
const axios = require('axios');

// Función para crear una nueva ruta con nombre, estado y username
async function createRoute(req, res) {
  const { routeName, username, status } = req.body;

  // Validación básica
  if (!routeName || !username) {
    return res.status(400).json({ error: 'Route name and username are required' });
  }

  try {
    // Crea una nueva instancia del modelo Location con los datos de la ruta
    const route = new Location({
      routeName,
      username,
      status: status || 'pending',  // Estado opcional, por defecto 'pending'
    });
    await route.save();

    res.status(201).json({ message: 'Route created successfully', data: route });
  } catch (error) {
    res.status(500).json({ error: 'Error creating route' });
  }
}

// Función para actualizar la ubicación y estado de una ruta
async function updateLocation(req, res) {
  const { routeId, latitude, longitude, status } = req.body;

  // Validación básica
  if (!routeId || latitude == null || longitude == null) {
    return res.status(400).json({ error: 'Route ID, latitude, and longitude are required' });
  }

  try {
    // Llama a la API de Node-RED para actualizar la ubicación y estado en tiempo real
    await axios.post('http://localhost:1880/api/location/update', {
      _id: routeId,
      currentLocation: {
        latitude,
        longitude,
        timestamp: new Date(),
      },
      status,
    });

    // Actualiza la ubicación y el estado en la base de datos (MongoDB)
    await Location.findByIdAndUpdate(routeId, {
      currentLocation: {
        latitude,
        longitude,
        timestamp: new Date(),
      },
      status,
    });

    res.status(200).json({ message: 'Location and status updated successfully' });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Error updating location' });
  }
}

module.exports = {
  createRoute,
  updateLocation,
};
