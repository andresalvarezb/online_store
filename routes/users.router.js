const express = require('express');
const router = express.Router();

const UsersService = require('../services/users.services');
const service = new UsersService()

router.get('/', async (req, res) => {
	const users = await service.find()
	res.json(users)
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const user = await service.findOne(id)
	res.json(user)
});

router.post('/', async (req, res) => {
	const body = req.body;
	const newUser = await service.create(body)
	res.status(201).json(newUser)
})

router.patch('/:id', async (req, res, next) => {
	try {
		const { id } = req.params
		const body = req.body
		const userUpdate = await service.update(id, body)
		res.json(userUpdate)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', async (req, res) => {
	const { id } = req.params
	const user = await service.delete(id)
	res.json({
		user,
		message: 'Delete user'
	})
})

module.exports = router;
