const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.send('all orders')
})

router.get('/:orderId', (req, res) => {
	const {orderId} = req.params
	res.send(`the order ${orderId}`)
})

module.exports = router
