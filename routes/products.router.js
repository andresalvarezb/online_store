const express = require('express');
const router = express.Router();
const validatorHandle = require('../middleware/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/products.schema');


const ProductsService = require('../services/products.service');
const service = new ProductsService();

// GET
router.get('/',  async (req, res) => {
	const products = await service.find();
	res.json(products)
});

router.get('/:id', validatorHandle(getProductSchema, 'params'), async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await service.findOne(id);
		res.json(product);
	} catch (error) {
		next(error);
	}

})


// POST
router.post('/', validatorHandle(createProductSchema, 'body'), async (req, res) => {
	// in the body is where all the parameters come
	const body = req.body;
	const newProduct = await service.create(body);
	res.status(201).json({ newProduct });
})


// PATCH
router.patch('/:id', validatorHandle(getProductSchema, 'params'), validatorHandle(updateProductSchema, 'body'),async (req, res, next) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const product = await service.update(id, body);
		res.json({ product })
	} catch (error) {
		next(error);
	}
})


// DELETE
router.delete('/:id', validatorHandle(getProductSchema, 'params'), async (req, res) => {
	const { id } = req.params;
	const product = await service.delete(id);
	res.json({
		product,
		message: 'Delete product',
	})
})

module.exports = router;
