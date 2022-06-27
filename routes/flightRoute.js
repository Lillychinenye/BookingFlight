const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');
const controller = require('../models/Flight');

router.get('/', controller.example)

router.post("/", controller.create);
// Retrieve all controller
router.get("/", controller.findAll);
// Retrieve all published controller
router.get("/published", controller.findAllPublished);
// Retrieve a single Tutorial with id
router.get("/:id", controller.findOne);
// Update a Tutorial with id
router.put("/:id", controller.update);
// Delete a Tutorial with id
router.delete("/:id", controller.delete)

module.exports = router;

