const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location')

// Ruta para crear una nueva ruta con nombre, estado y username
router.post('/create-route', locationController.createRoute);

// Ruta para actualizar la ubicación y estado de una ruta
router.post('/update-location', locationController.updateLocation);

module.exports = router;
