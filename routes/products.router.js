const express = require('express');
const faker = require('faker');

const router = express.Router();
// GET
router.get('/', (req, res) => {
    const { size } = req.query;
    const limit = size || 10;
    const products = [];
    for (let product = 0; product < limit; product++) {
        products.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            img: faker.image.imageUrl(),
        })
    }
    res.json(products)
});

router.get('/filter', (req, res) => {
    res.send('I am a filter');
})

// ! Get with dynamic status
router.get('/:productId', (req, res) => {
    const { productId } = req.params;
    if (productId === '999') {
        res.status(404).json({
            message: 'Error'
        })
    };
    res.status(201).json({
        productId,
        name: 'product 2',
        price: 4531
    })
})


// POST
router.post('/', (req, res) => {
    // in the body is where all the parameters come
    const body = req.body;
    res.status(201).json({
        message: 'Created',
        data: body
    })
})


// PATCH
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.json({
        id,
        message: 'Partial update',
        data: body
    })
})


// DELTE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        message: 'Delete product',
    })
})

module.exports = router;
