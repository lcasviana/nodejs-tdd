const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/:id', productsController.insert);

module.exports = router;
