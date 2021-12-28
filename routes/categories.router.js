const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Categories')
})


router.get('/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    res.send(`Category ${categoryId}`)
})

// endpoint with 2 params
router.get('/:categoryId/product/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json({
        productId,
        categoryId,
        name: 'product 2',
        price: 4531
    })
})

module.exports = router;
