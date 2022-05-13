var express = require('express');
var router = express.Router();

const CarController = require('../controller/car');

const isSuperAdmin = require('../middleware/isSuperAdmin')
const isAdmin = require('../middleware/isAdmin')
const isMember = require('../middleware/isMember')

const authAdmins = require('../middleware/authAdmins')
const authRegistered = require('../middleware/authRegistered')

// Endpoint Create (C)
router.post('/add-car', authAdmins, CarController.addCar);

// Endpoint Read (R)
router.get('/', authAdmins, CarController.getAllCars);
router.get('/true', authRegistered, CarController.getCarsTrue);
router.get('/false', authAdmins, CarController.getCarsFalse);

// Endpoint Update (U)
router.put('/update/:id', authAdmins, CarController.updateCar);

// Endpoint Delete (D)
router.post('/delete/:id', authAdmins, CarController.softDeleteCar);
router.delete('/destroy/:id', authAdmins, CarController.destroyCar);

module.exports = router;