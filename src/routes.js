const { Router } = require('express');

const ProductController = require('./app/controllers/ProductController');
const CategoriesController = require('./app/controllers/CategoriesController');

const router = Router();

router.get('/produtos', ProductController.index);
router.get('/produtos/:id', ProductController.show);
router.delete('/produtos/:id', ProductController.delete);
router.post('/produtos', ProductController.store);
router.put('/produtos/:id', ProductController.update);

router.get('/categoria', CategoriesController.index);
router.get('/categoria/:id', CategoriesController.show);
router.delete('/categoria/:id', CategoriesController.delete);
router.post('/categoria', CategoriesController.store);
router.put('/categoria/:id', CategoriesController.update);


module.exports = router;
